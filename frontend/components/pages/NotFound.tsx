import { Link } from "react-router";

export function meta() {
  return [{ title: "Not found — Artiom" }];
}

export default function NotFound() {
  return (
    <div className="max-w-page mx-auto px-5 md:px-10 pt-10 min-h-[60vh]">
      <p className="font-mono text-sm text-muted mb-4">
        {"// nothing lives here."}
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-ink transition-colors"
      >
        ← Back home
      </Link>
    </div>
  );
}
