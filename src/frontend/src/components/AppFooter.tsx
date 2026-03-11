import { Heart } from "lucide-react";

export function AppFooter() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="mt-auto border-t border-border/40 py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-sm text-muted-foreground">
          © {year}. Built with{" "}
          <Heart className="inline h-3.5 w-3.5 text-destructive" /> using{" "}
          <a
            href={utmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
