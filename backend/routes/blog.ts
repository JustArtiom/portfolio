import { Router } from "express";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { getStars, getViews, hasStar, incViews, toggleStar } from "../db";

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
  for (const id of ids) out[id] = { views: getViews(id), stars: getStars(id) };
  res.json(out);
});

// Current counts, plus whether this client has starred it.
router.get("/:id/stats", (req, res) => {
  const id = req.params.id;
  if (!SLUG.test(id)) return res.status(400).json({ error: "invalid id" });
  const clientId =
    typeof req.query.clientId === "string" ? req.query.clientId : "";
  const starred =
    !!clientId && CLIENT.test(clientId) ? hasStar(id, clientId) : false;
  res.json({ views: getViews(id), stars: getStars(id), starred });
});

// Increment views (duplicates allowed — just a counter).
router.post("/:id/view", (req, res) => {
  const id = req.params.id;
  if (!SLUG.test(id)) return res.status(400).json({ error: "invalid id" });
  res.json({ views: incViews(id) });
});

// Toggle a star for this client id (one star per client per blog).
router.post("/:id/star", (req, res) => {
  const id = req.params.id;
  if (!SLUG.test(id)) return res.status(400).json({ error: "invalid id" });
  const clientId = req.body?.clientId;
  if (typeof clientId !== "string" || !CLIENT.test(clientId))
    return res.status(400).json({ error: "invalid clientId" });

  const starred = toggleStar(id, clientId);
  res.json({ stars: getStars(id), starred });
});

export default router;
