import { Router } from "express";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { db } from "../db";

const router = Router();

const SLUG = /^[a-z0-9][a-z0-9-]{0,63}$/i;
const CLIENT = /^[a-zA-Z0-9-]{8,64}$/;

// Per-IP rate limit across all blog endpoints (real client IP via Cloudflare).
const limiter = rateLimit({
  windowMs: 60_000,
  limit: 60,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req) => {
    const cf = req.headers["cf-connecting-ip"];
    const ip = (Array.isArray(cf) ? cf[0] : cf) || req.ip || "unknown";
    return ipKeyGenerator(ip);
  },
});
router.use(limiter);

const stmtViews = db.prepare("SELECT count FROM blog_views WHERE blog_id = ?");
const stmtIncView = db.prepare(
  `INSERT INTO blog_views (blog_id, count) VALUES (?, 1)
   ON CONFLICT(blog_id) DO UPDATE SET count = count + 1
   RETURNING count`
);
const stmtStarCount = db.prepare(
  "SELECT COUNT(*) AS n FROM blog_stars WHERE blog_id = ?"
);
const stmtHasStar = db.prepare(
  "SELECT 1 FROM blog_stars WHERE blog_id = ? AND client_id = ?"
);
const stmtAddStar = db.prepare(
  "INSERT OR IGNORE INTO blog_stars (blog_id, client_id, created_at) VALUES (?, ?, ?)"
);
const stmtDelStar = db.prepare(
  "DELETE FROM blog_stars WHERE blog_id = ? AND client_id = ?"
);

const viewsOf = (id: string) =>
  (stmtViews.get(id) as { count: number } | undefined)?.count ?? 0;
const starsOf = (id: string) => (stmtStarCount.get(id) as { n: number }).n;

// Batch read-only counts for cards/listings (no view increment).
// GET /stats?ids=a,b,c  ->  { a: { views, stars }, ... }
router.get("/stats", (req, res) => {
  const idsParam = typeof req.query.ids === "string" ? req.query.ids : "";
  const ids = idsParam
    .split(",")
    .map((s) => s.trim())
    .filter((s) => SLUG.test(s))
    .slice(0, 50);
  const out: Record<string, { views: number; stars: number }> = {};
  for (const id of ids) out[id] = { views: viewsOf(id), stars: starsOf(id) };
  res.json(out);
});

// Current counts, plus whether this client has starred it.
router.get("/:id/stats", (req, res) => {
  const id = req.params.id;
  if (!SLUG.test(id)) return res.status(400).json({ error: "invalid id" });
  const clientId =
    typeof req.query.clientId === "string" ? req.query.clientId : "";
  const starred =
    !!clientId && CLIENT.test(clientId)
      ? !!stmtHasStar.get(id, clientId)
      : false;
  res.json({ views: viewsOf(id), stars: starsOf(id), starred });
});

// Increment views (duplicates allowed — just a counter).
router.post("/:id/view", (req, res) => {
  const id = req.params.id;
  if (!SLUG.test(id)) return res.status(400).json({ error: "invalid id" });
  const row = stmtIncView.get(id) as { count: number };
  res.json({ views: row.count });
});

// Toggle a star for this client id (one star per client per blog).
router.post("/:id/star", (req, res) => {
  const id = req.params.id;
  if (!SLUG.test(id)) return res.status(400).json({ error: "invalid id" });
  const clientId = req.body?.clientId;
  if (typeof clientId !== "string" || !CLIENT.test(clientId))
    return res.status(400).json({ error: "invalid clientId" });

  const already = !!stmtHasStar.get(id, clientId);
  if (already) stmtDelStar.run(id, clientId);
  else stmtAddStar.run(id, clientId, Date.now());

  res.json({ stars: starsOf(id), starred: !already });
});

export default router;
