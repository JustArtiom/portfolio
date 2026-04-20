import { Router, type Request, type Response } from "express";

const router = Router();

const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 4000;

const EMBED_COLOR = 0xe53935;
const OWNER_ID = "526191240962768910";

router.post("/", async (req: Request, res: Response) => {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    console.error("DISCORD_WEBHOOK_URL is not set");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const body = req.body as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    source?: unknown;
  };

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const source = typeof body.source === "string" ? body.source.trim() : "";

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }
  if (
    name.length > MAX_NAME ||
    email.length > MAX_EMAIL ||
    message.length > MAX_MESSAGE
  ) {
    return res.status(413).json({ error: "Payload too large" });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "artiom.me · contact form",
        content: `<@${OWNER_ID}> new message incoming`,
        allowed_mentions: { users: [OWNER_ID] },
        embeds: [
          {
            title: "New message",
            color: EMBED_COLOR,
            fields: [
              { name: "Name", value: name, inline: true },
              { name: "Email", value: email, inline: true },
              { name: "Source", value: source || "—", inline: true },
              { name: "Message", value: message.slice(0, 1024) },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("Discord webhook failed", response.status, text);
      return res.status(502).json({ error: "Upstream error" });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("Contact route error", err);
    return res.status(500).json({ error: "Couldn't send message" });
  }
});

export default router;
