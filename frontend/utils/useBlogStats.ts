import { useCallback, useEffect, useRef, useState } from "react";

export interface BlogStats {
  views: number;
  stars: number;
  starred: boolean;
}

const CLIENT_KEY = "blog-client-id";

/** Stable per-device id so a refresh remembers this device already starred. */
function getClientId(): string {
  let id = localStorage.getItem(CLIENT_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(CLIENT_KEY, id);
  }
  return id;
}

export type StatCounts = { views: number; stars: number };

/** Read-only counts for many posts at once (for cards/listings; no view count). */
export function useBlogStatsMap(slugs: string[]): Record<string, StatCounts> {
  const [map, setMap] = useState<Record<string, StatCounts>>({});
  const key = slugs.join(",");

  useEffect(() => {
    if (!key) return;
    let alive = true;
    fetch(`/api/blogs/stats?ids=${encodeURIComponent(key)}`)
      .then((r) => (r.ok ? r.json() : {}))
      .then((d) => {
        if (alive && d && typeof d === "object")
          setMap(d as Record<string, StatCounts>);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [key]);

  return map;
}

export function useBlogStats(slug: string | undefined) {
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [pending, setPending] = useState(false);
  const busy = useRef(false);
  const countedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    const clientId = getClientId();

    fetch(`/api/blogs/${slug}/stats?clientId=${encodeURIComponent(clientId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d) setStats(d);
      })
      .catch(() => {});

    // Count a view on every visit (refresh/navigation counts). The ref only
    // suppresses React StrictMode's synchronous double-invoke in dev.
    if (countedFor.current !== slug) {
      countedFor.current = slug;
      fetch(`/api/blogs/${slug}/view`, { method: "POST" })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (alive && d) setStats((s) => (s ? { ...s, views: d.views } : s));
        })
        .catch(() => {});
    }

    return () => {
      alive = false;
    };
  }, [slug]);

  const toggleStar = useCallback(async () => {
    if (!slug || busy.current) return;
    busy.current = true;
    setPending(true);
    try {
      const clientId = getClientId();
      const r = await fetch(`/api/blogs/${slug}/star`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId }),
      });
      if (r.ok) {
        const d = await r.json();
        setStats((s) => (s ? { ...s, stars: d.stars, starred: d.starred } : d));
      }
    } catch {
      /* network error — leave state as-is */
    } finally {
      busy.current = false;
      setPending(false);
    }
  }, [slug]);

  return { stats, toggleStar, pending };
}
