import Link from "next/link";
import { AuraRings } from "@/components/aura-rings";

const steps = [
  {
    number: "01",
    title: "Sense",
    body: "A wrist-worn prototype is intended to read pulse, skin conductance, skin temperature, and movement. The app shows these as estimates with a quality flag — never as a diagnosis.",
  },
  {
    number: "02",
    title: "Notice",
    body: "You see your own signals, plainly. No mood label, no stress score, and no notification telling you how you feel.",
  },
  {
    number: "03",
    title: "Breathe",
    body: "If you choose, a guided breathing session gives your attention somewhere simple to rest. You start it, and you can stop it at any time.",
  },
];

const principles = [
  {
    title: "Your permission",
    body: "Sensing is opt-in. Nothing is read in the background, and the app is intended to stay useful if you decline device access.",
  },
  {
    title: "Local-first",
    body: "The prototype is designed to keep data on your phone. No account, no cloud sync, and no sensor history uploaded by default.",
  },
  {
    title: "Honest signals",
    body: "A measurement the prototype cannot trust is shown as unavailable. We would rather show a gap than invent a number.",
  },
];

const faqs = [
  {
    question: "Can I buy an AuraSync device?",
    answer:
      "No. There is no product for sale, no deposit, and no delivery date. This site exists to explain a concept that is still in development.",
  },
  {
    question: "Is this a medical device?",
    answer:
      "No. AuraSync is not intended to diagnose, treat, cure, or prevent any condition. If you have a health concern, speak to a qualified professional.",
  },
  {
    question: "Does it tell me whether I am stressed?",
    answer:
      "No. The concept may display pulse and HRV estimates from a compatible device. Those signals vary with activity, fit, and many other factors. They do not establish whether you are stressed, calm, anxious, or unwell.",
  },
  {
    question: "What does this website collect about me?",
    answer:
      "Nothing. There are no accounts, forms, cookies, or analytics on this site today. Any future waitlist would collect a minimum of information, with a reviewed privacy notice and a working deletion path.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="aurora relative overflow-hidden text-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-cream/70">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-amber"
              />
              Concept · In development
            </p>

            <h1 className="mt-6 max-w-2xl text-balance font-display text-5xl leading-[1.03] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
              A quieter way to notice how you feel.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-cream/70 sm:text-lg sm:leading-8">
              AuraSync is a wellness concept: a wrist-worn sensor, a phone app,
              and a simple breathing practice — built around your permission and
              your control.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/how-it-works"
                className="rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-[#f0b25c]"
              >
                See how it works
              </Link>
              <Link
                href="/concept-status"
                className="rounded-full border border-cream/25 px-6 py-3 text-sm font-medium text-cream transition-colors hover:border-cream/50 hover:bg-cream/5"
              >
                What exists today
              </Link>
            </div>

            <p className="mt-8 text-xs tracking-wide text-cream/65">
              No product for sale. No medical claims. No data collected here.
            </p>
          </div>

          <AuraRings />
        </div>

        <div className="border-t border-cream/10 bg-ink/50">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-4 text-xs text-cream/55 sm:flex-row sm:items-center sm:gap-6 sm:px-8">
            <span className="shrink-0 uppercase tracking-[0.2em] text-amber/80">
              What this is not
            </span>
            <p>
              Not a medical device. It does not diagnose, treat, or measure
              “energy”. It is not available to buy.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-ink">
            Why we are building
          </p>
          <div>
            <h2 className="max-w-3xl text-balance font-display text-3xl leading-snug tracking-[-0.01em] sm:text-4xl">
              Most “calm” apps ask for more attention. We are testing whether a
              physical signal and a short breathing practice can ask for less.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              That is a hypothesis, not a promise. The first version is
              deliberately small: one wrist-worn development device, one phone
              app, and a practice you control. We are not claiming it reduces
              stress or improves health — only that it is worth testing
              carefully, with people, before anyone spends money on hardware.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream/60">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-ink">
                The interaction
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-[-0.01em] sm:text-4xl">
                Sense. Notice. Breathe.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted">
              Three steps, in the order a person would actually use them. All
              three are optional, and the third works without the first.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="flex flex-col rounded-2xl border border-ink/10 bg-paper p-7"
              >
                <span className="font-display text-2xl text-clay-ink">
                  {step.number}
                </span>
                <h3 className="mt-6 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-ink">
            Design principles
          </p>
          <div className="mt-8 grid gap-x-12 gap-y-10 md:grid-cols-3">
            {principles.map((principle) => (
              <div key={principle.title} className="border-t border-ink/15 pt-5">
                <h3 className="font-display text-xl">{principle.title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-muted">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber/80">
                Where we are
              </p>
              <h2 className="mt-4 max-w-md font-display text-3xl leading-snug sm:text-4xl">
                A concept site today. An app prototype next.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-cream/60">
                We are publishing the thinking before the product, so the claims
                and the limits are visible while they can still be challenged.
              </p>
              <Link
                href="/concept-status"
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-amber transition-colors hover:text-[#f0b25c]"
              >
                Read the full status
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <ol className="space-y-0 border-t border-cream/10">
              {[
                ["Concept defined", "Done", "Target user, boundary, and claim limits written down."],
                ["This website", "In review", "The first public surface. No data collected."],
                ["Companion app", "Next", "Local-first prototype, sensor-free sessions first."],
                ["Device prototype", "Planned", "One development kit behind a typed adapter."],
                ["Small internal trial", "Not started", "Five to ten people, usability only."],
              ].map(([label, status, detail]) => (
                <li
                  key={label}
                  className="grid gap-1 border-b border-cream/10 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <div>
                    <p className="text-sm font-medium text-cream">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-cream/65">
                      {detail}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.16em] text-cream/65">
                    {status}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-ink">
                Straight answers
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                Questions we expect.
              </h2>
            </div>

            <div className="border-t border-ink/15">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-ink/15 py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-sm font-medium marker:hidden [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="mt-0.5 text-lg leading-none text-clay-ink transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-cream/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl">
              The build log is public.
            </h2>
            <p className="mt-2 text-sm text-muted">
              See what is real, what is planned, and what we will not claim.
            </p>
          </div>
          <Link
            href="/concept-status"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-ink-soft sm:self-auto"
          >
            Concept status
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
