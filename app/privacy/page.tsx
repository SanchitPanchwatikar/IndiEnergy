import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How the AuraSync concept website handles information: it collects none today, and any future list will require a reviewed notice and deletion path.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-ink">
        Privacy
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight tracking-[-0.02em] sm:text-5xl">
        We collect nothing here today.
      </h1>
      <p className="mt-5 text-sm leading-7 text-muted">
        This is a concept website. It has no accounts, no forms, no cookies, and
        no analytics. It does not ask for your name, email address, phone
        number, or any health information.
      </p>

      <div className="mt-10 space-y-8 border-t border-ink/15 pt-8 text-sm leading-7 text-muted">
        <div>
          <h2 className="font-display text-2xl text-ink">If that changes</h2>
          <p className="mt-2">
            A waitlist may open later. Before any personal data is collected,
            this page would state what is collected, why, how long it is kept,
            who can access it, and how to withdraw or delete it. Collection
            would require explicit consent, and the notice would be reviewed for
            the launch market first.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink">
            What about the companion app?
          </h2>
          <p className="mt-2">
            The app is not available yet. Its design intent is local-first: keep
            measurements on your phone, avoid accounts, and avoid uploading
            sensor history by default. Any change to that would need a separate
            purpose, notice, consent, and deletion design before it ships.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink">Contact</h2>
          <p className="mt-2">
            There is no contact route or mailing list active yet. When one
            opens, it will be listed here and in the site footer.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink">Status</h2>
          <p className="mt-2">
            Draft for review. This notice has not yet been reviewed by qualified
            counsel for any market, and it makes no legal claim about
            compliance. It describes the site as built.
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
