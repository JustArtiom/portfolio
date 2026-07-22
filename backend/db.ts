import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// Lives outside the deploy-cleaned area (CI keeps `data/` via clean_ignore).
const dbPath =
  process.env.DATABASE_PATH || path.join(process.cwd(), "data", "stats.db");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 5000");

db.exec(`
  CREATE TABLE IF NOT EXISTS blog_views (
    blog_id TEXT PRIMARY KEY,
    count   INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS blog_stars (
    blog_id    TEXT    NOT NULL,
    client_id  TEXT    NOT NULL,
    created_at INTEGER NOT NULL,
    PRIMARY KEY (blog_id, client_id)
  );

  CREATE INDEX IF NOT EXISTS idx_blog_stars_blog ON blog_stars (blog_id);
`);

console.log(`[db] sqlite ready at ${dbPath}`);
