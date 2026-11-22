import Link from "next/link";
import { Wordmark } from "@/components/wordmark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <Wordmark />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm text-muted sm:flex"
        >
          <Link href="/how-it-works" className="transition-colors hover:text-ink">
            How it works
          </Link>
          <Link
            href="/concept-status"
            className="transition-colors hover:text-ink"
          >
            Concept status
          </Link>
        </nav>

        <Link
          href="/concept-status"
          className="rounded-full bg-ink px-4 py-2.5 text-xs font-semibold tracking-wide text-cream transition-colors hover:bg-ink-soft"
        >
          What exists today
        </Link>
      </div>
    </header>
  );
}
