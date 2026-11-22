import Link from "next/link";
import { Wordmark } from "@/components/wordmark";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Wordmark tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-6 text-cream/55">
              AuraSync is a wellness concept in development. It is not a medical
              device, it does not diagnose or treat anything, and no product is
              for sale.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-cream/65">
              Explore
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-cream/75 transition-colors hover:text-amber"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/concept-status"
                  className="text-cream/75 transition-colors hover:text-amber"
                >
                  Concept status
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-cream/75 transition-colors hover:text-amber"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-cream/75 transition-colors hover:text-amber"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-cream/65">
              Updates
            </h2>
            <p className="mt-4 text-sm leading-6 text-cream/55">
              There is no waitlist yet. It will open only after a privacy notice
              and deletion path are reviewed. No email address is collected on
              this site today.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 AuraSync. Concept website — not an offer for sale.</p>
          <p>An early concept, built in the open.</p>
        </div>
      </div>
    </footer>
  );
}
