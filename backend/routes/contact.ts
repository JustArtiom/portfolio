import { Router, type Request, type Response } from "express";

const router = Router();

const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 4000;
const MAX_META = 200;
const MAX_REFERRER = 800;

const EMBED_COLOR = 0xe53935;
const OWNER_ID = "526191240962768910";

function pickHeader(req: Request, name: string): string {
  const v = req.headers[name];
  if (Array.isArray(v)) return v[0] ?? "";
  return typeof v === "string" ? v : "";
}

function pickStr(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  const s = v.trim();
  return s.length > max ? s.slice(0, max) : s;
}

function normalizeIp(ip: string): string {
  if (!ip) return "";
  if (ip.startsWith("::ffff:")) return ip.slice(7);
  return ip;
}

function clientIp(req: Request): string {
  const cf = pickHeader(req, "cf-connecting-ip");
  if (cf) return normalizeIp(cf);
  const trueClient = pickHeader(req, "true-client-ip");
  if (trueClient) return normalizeIp(trueClient);
  const xff = pickHeader(req, "x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return normalizeIp(first);
  }
  return normalizeIp(req.ip ?? "");
}

type DeviceType = "Mobile" | "Tablet" | "Desktop" | "Bot" | "Unknown";

function parseUA(ua: string): {
  os: string;
  browser: string;
  device: DeviceType;
} {
  if (!ua) return { os: "—", browser: "—", device: "Unknown" };

  if (/bot|crawl|spider|slurp|facebookexternalhit|preview/i.test(ua)) {
    const m = ua.match(/([A-Za-z][A-Za-z0-9.\-_]*?(?:bot|crawler|spider))/i);
    return { os: "—", browser: m?.[1] ?? "Bot", device: "Bot" };
  }

  const isTablet = /iPad|Tablet/i.test(ua);
  const isMobile = !isTablet && /Mobile|Android|iPhone|iPod/i.test(ua);
  const device: DeviceType = isTablet
    ? "Tablet"
    : isMobile
      ? "Mobile"
      : "Desktop";

  let os = "Unknown";
  let m: RegExpMatchArray | null;
  if ((m = ua.match(/Windows NT ([\d.]+)/))) {
    const map: Record<string, string> = {
      "10.0": "10/11",
      "6.3": "8.1",
      "6.2": "8",
      "6.1": "7",
    };
    os = `Windows ${map[m[1]] ?? m[1]}`;
  } else if ((m = ua.match(/Mac OS X ([\d_.]+)/))) {
    os = `macOS ${m[1].replace(/_/g, ".")}`;
  } else if (
    (m = ua.match(/iPhone OS ([\d_.]+)/)) ||
    (m = ua.match(/CPU OS ([\d_.]+)/))
  ) {
    os = `iOS ${m[1].replace(/_/g, ".")}`;
  } else if ((m = ua.match(/Android ([\d.]+)/))) {
    os = `Android ${m[1]}`;
  } else if (/CrOS/i.test(ua)) {
    os = "ChromeOS";
  } else if (/Linux/i.test(ua)) {
    os = "Linux";
  }

  let browser = "Unknown";
  if ((m = ua.match(/Edg\/([\d.]+)/))) browser = `Edge ${m[1]}`;
  else if ((m = ua.match(/OPR\/([\d.]+)/))) browser = `Opera ${m[1]}`;
  else if ((m = ua.match(/Chrome\/([\d.]+)/))) browser = `Chrome ${m[1]}`;
  else if ((m = ua.match(/Firefox\/([\d.]+)/))) browser = `Firefox ${m[1]}`;
  else if ((m = ua.match(/Version\/([\d.]+).*Safari/)))
    browser = `Safari ${m[1]}`;
  else if (/Safari/.test(ua)) browser = "Safari";

  return { os, browser, device };
}

function countryFlag(cc: string): string {
  if (!cc || cc.length !== 2 || !/^[A-Za-z]{2}$/.test(cc)) return "";
  const A = 0x1f1e6;
  const u = cc.toUpperCase();
  return String.fromCodePoint(A + u.charCodeAt(0) - 65, A + u.charCodeAt(1) - 65);
}

function clip(s: string, max: number): string {
  if (!s) return "";
  return s.length <= max ? s : s.slice(0, max - 1) + "…";
}

router.post("/", async (req: Request, res: Response) => {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    console.error("DISCORD_WEBHOOK_URL is not set");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const body = req.body as Record<string, unknown>;

  const name = pickStr(body.name, MAX_NAME);
  const email = pickStr(body.email, MAX_EMAIL);
  const message = pickStr(body.message, MAX_MESSAGE);
  const source = pickStr(body.source, MAX_META);
  const tz = pickStr(body.tz, MAX_META);
  const lang = pickStr(body.lang, MAX_META);
  const langs = pickStr(body.langs, MAX_META);
  const referrer = pickStr(body.referrer, MAX_REFERRER);
  const screen = pickStr(body.screen, MAX_META);
  const viewport = pickStr(body.viewport, MAX_META);

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

  const ip = clientIp(req) || "—";
  const country = pickHeader(req, "cf-ipcountry");
  const ray = pickHeader(req, "cf-ray");
  const ua = pickHeader(req, "user-agent");
  const acceptLang = pickHeader(req, "accept-language");
  const { os, browser, device } = parseUA(ua);
  const flag = countryFlag(country);
  const countryDisplay = country
    ? `${flag ? flag + " " : ""}${country}`
    : "—";

  console.log(
    `[contact] ${ip} (${country || "??"}) ${device}/${os}/${browser} ${name} <${email}> ray=${ray || "-"}`
  );
  console.log("[contact:debug]", {
    "remoteAddress": req.socket.remoteAddress,
    "req.ip": req.ip,
    "cf-connecting-ip": req.headers["cf-connecting-ip"],
    "true-client-ip": req.headers["true-client-ip"],
    "x-forwarded-for": req.headers["x-forwarded-for"],
    "x-real-ip": req.headers["x-real-ip"],
    "cf-ipcountry": req.headers["cf-ipcountry"],
    "cf-ray": req.headers["cf-ray"],
  });

  const fields = [
    { name: "Name", value: name, inline: true },
    { name: "Email", value: email, inline: true },
    { name: "Source", value: source || "—", inline: true },

    { name: "IP", value: ip, inline: true },
    { name: "Country", value: countryDisplay, inline: true },
    { name: "Device", value: device, inline: true },

    { name: "OS", value: os, inline: true },
    { name: "Browser", value: browser, inline: true },
    { name: "Timezone", value: tz || "—", inline: true },

    { name: "Lang (browser)", value: langs || lang || "—", inline: true },
    {
      name: "Lang (header)",
      value: clip(acceptLang, 200) || "—",
      inline: true,
    },
    {
      name: "Screen · Viewport",
      value: `${screen || "—"} · ${viewport || "—"}`,
      inline: true,
    },

    { name: "Referrer", value: clip(referrer || "—", 1024) },
    {
      name: "User-Agent",
      value: ua ? "```" + clip(ua, 1010) + "```" : "—",
    },
    { name: "Message", value: clip(message, 1024) },
  ];

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
            fields,
            footer: ray ? { text: `CF-Ray ${ray}` } : undefined,
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
