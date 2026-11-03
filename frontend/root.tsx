import { useLayoutEffect, type ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
} from "react-router";
import type { Route } from "./+types/root";
import { structuredData } from "@/seo";
import {
  applyStoredTheme,
  THEME_STORAGE_KEY,
  themeInitScript,
} from "@/utils/theme";
import "./global.css";

const GA_MEASUREMENT_ID = "G-E9DYX530MP";
const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";

const gaInitScript = `window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag("js", new Date());
gtag("config", ${JSON.stringify(GA_MEASUREMENT_ID)});`;

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/favicon.svg" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "stylesheet", href: GOOGLE_FONTS_URL },
];

export function Layout({ children }: { children: ReactNode }) {
  // A hydration mismatch or a crash caught by the ErrorBoundary makes React
  // re-render the whole document, rebuilding <html> without the `dark` class
  // the head script added. Re-apply it before paint so the theme sticks.
  useLayoutEffect(() => {
    applyStoredTheme(THEME_STORAGE_KEY);
  }, []);

  return (
    // The theme script adds the `dark` class before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        <Meta />
        <meta
          name="keywords"
          content="Artiom, full-stack developer, London, TypeScript, React, Node.js, Go, Python, freelance developer, web developer, software engineer, Wakeflow"
        />
        <meta name="author" content="Artiom" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1"
        />
        <meta
          name="theme-color"
          content="#e53935"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1a1a1a"
          media="(prefers-color-scheme: dark)"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Artiom" />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@JustArtiom" />
        <Links />

        {structuredData.map((data) => (
          <script
            key={data["@type"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script dangerouslySetInnerHTML={{ __html: gaInitScript }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// Last-resort screen for errors thrown while rendering. Unknown URLs are
// handled by the NotFound route inside the site layout instead.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "something went wrong";

  return (
    <main className="max-w-page mx-auto px-5 md:px-10 pt-20 min-h-[60vh]">
      <title>Error — Artiom</title>
      <p className="font-mono text-sm text-muted">{`// ${message}`}</p>
      <a href="/" className="font-mono text-xs text-muted hover:text-ink">
        ← Back home
      </a>
    </main>
  );
}
