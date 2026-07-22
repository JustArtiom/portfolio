import fs from "fs";
import path from "path";

// Pure-JS JSON store — no native modules (the container's glibc is too old for
// better-sqlite3 prebuilds). Lives in `data/` which CI keeps via clean_ignore.
const dbPath =
  process.env.DATABASE_PATH || path.join(process.cwd(), "data", "stats.json");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

interface Data {
  views: Record<string, number>; // slug -> count
  stars: Record<string, string[]>; // slug -> client ids that starred it
}

let data: Data = { views: {}, stars: {} };

try {
  if (fs.existsSync(dbPath)) {
    const parsed = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    data = {
      views:
        parsed?.views && typeof parsed.views === "object" ? parsed.views : {},
      stars:
        parsed?.stars && typeof parsed.stars === "object" ? parsed.stars : {},
    };
  }
} catch (err) {
  console.error("[db] could not read stats file, starting fresh:", err);
}

// Synchronous atomic write (tmp + rename) after each mutation. Write volume is
// tiny for a blog, and this guarantees nothing is lost on restart.
function persist() {
  try {
    const tmp = `${dbPath}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(data));
    fs.renameSync(tmp, dbPath);
  } catch (err) {
    console.error("[db] save failed:", err);
  }
}

export function getViews(slug: string): number {
  return data.views[slug] || 0;
}

export function incViews(slug: string): number {
  data.views[slug] = (data.views[slug] || 0) + 1;
  persist();
  return data.views[slug];
}

export function getStars(slug: string): number {
  return data.stars[slug]?.length || 0;
}

export function hasStar(slug: string, clientId: string): boolean {
  return !!data.stars[slug]?.includes(clientId);
}

/** Toggle a client's star; returns the new starred state. */
export function toggleStar(slug: string, clientId: string): boolean {
  const list = data.stars[slug] || (data.stars[slug] = []);
  const i = list.indexOf(clientId);
  if (i >= 0) {
    list.splice(i, 1);
    persist();
    return false;
  }
  list.push(clientId);
  persist();
  return true;
}

console.log(`[db] json store ready at ${dbPath}`);
