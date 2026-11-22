import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms for the AuraSync concept website: informational only, not medical advice, and not an offer for sale.",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-ink">
        Terms
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight tracking-[-0.02em] sm:text-5xl">
        An informational concept site.
      </h1>
      <p className="mt-5 text-sm leading-7 text-muted">
        By using this website you accept these terms. They are short because
        the site does very little.
      </p>

      <div className="mt-10 space-y-8 border-t border-ink/15 pt-8 text-sm leading-7 text-muted">
        <div>
          <h2 className="font-display text-2xl text-ink">No offer for sale</h2>
          <p className="mt-2">
            Nothing on this site is an offer to sell a product, accept a
            deposit, or promise a delivery date. No price, stock level, or
            launch date is stated because none exists.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink">Not medical advice</h2>
          <p className="mt-2">
            AuraSync is a wellness concept, not a medical device or a healthcare
            service. Nothing here diagnoses, treats, cures, or prevents any
            condition, and nothing here should replace advice from a qualified
            professional. If you have a health concern, seek appropriate care.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink">
            Content may change
          </h2>
          <p className="mt-2">
            This site describes work in progress. Features, timelines, and
            wording may change or be withdrawn, and status statements describe
            the date shown on the concept status page rather than a future
            commitment.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink">No warranty</h2>
          <p className="mt-2">
            The site is provided as is. To the extent permitted by applicable
            law, no warranty is made about its accuracy, availability, or
            fitness for a particular purpose.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink">Status</h2>
          <p className="mt-2">
            Draft for review. These terms have not been reviewed by qualified
            counsel for any market.
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-ink/15 pt-8">
        <Link
          href="/concept-status"
          className="text-sm font-medium text-clay-ink underline decoration-clay/60 underline-offset-4 hover:decoration-clay-ink"
        >
          See what exists today
        </Link>
      </div>
    </section>
  );
}
