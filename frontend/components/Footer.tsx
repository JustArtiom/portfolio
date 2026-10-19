import { Heart } from "lucide-react";
import { site } from "@/constants";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10 pb-8 mt-10">
      <div className="max-w-page mx-auto px-5 md:px-10 flex justify-between items-baseline gap-4 flex-wrap">
        <span className="text-base text-ink-2 inline-flex items-center gap-1.5">
          Made with
          <Heart
            role="img"
            aria-label="love"
            className="w-4 h-4 text-accent fill-current"
          />
          in London, UK.
        </span>
        <span className="flex gap-2.5 items-baseline font-mono text-xs text-muted flex-wrap">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="text-faint">·</span>
          <span>{site.version}</span>
        </span>
      </div>
    </footer>
  );
}
