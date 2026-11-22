import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Concept status",
  description:
    "An honest status page for AuraSync: what exists today, what is planned, what is not started, and the claims we will not make.",
};

type StatusTone = "live" | "progress" | "planned" | "none";

function Status({ tone, children }: { tone: StatusTone; children: string }) {
  const styles: Record<StatusTone, string> = {
    live: "border-sage/50 bg-sage/15 text-[#41614f]",
    progress: "border-amber/50 bg-amber/15 text-[#7a5510]",
    planned: "border-ink/15 bg-ink/5 text-muted",
    none: "border-clay/40 bg-clay/10 text-[#8a4a39]",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

const surfaces: Array<{
  name: string;
  status: string;
  tone: StatusTone;
  detail: string;
}> = [
  {
    name: "This website",
    status: "In review",
    tone: "progress",
    detail:
      "The first public surface. Static pages, no accounts, no forms, and no analytics.",
  },
  {
    name: "Companion app",
    status: "Not started",
    tone: "planned",
    detail:
      "Planned as a local-first prototype: onboarding, sensor-free breathing sessions, and quality-aware readings.",
  },
  {
    name: "Device",
    status: "Not selected",
    tone: "planned",
    detail:
      "No wrist-worn kit has been chosen. A shortlist and bench test come before any app integration.",
  },
  {
    name: "Waitlist",
    status: "Closed",
    tone: "none",
    detail:
      "No email addresses are collected. It opens only after a privacy notice, retention rule, and deletion path are reviewed.",
  },
  {
    name: "Pilot",
    status: "Not started",
    tone: "none",
    detail:
      "No participants have been recruited. A pilot requires a protocol, consent, and device safety review.",
  },
  {
    name: "Sales",
    status: "None",
    tone: "none",
    detail:
      "No product, price, deposit, inventory, or delivery date exists. Nothing on this site is an offer to sell.",
  },
];

const roadmap = [
  {
    phase: "P1",
    title: "Website",
    timing: "Weeks 1–2",
    body: "This site: an honest explanation of the concept, the limits, and the status.",
    state: "In progress",
  },
  {
    phase: "P2",
    title: "Waitlist",
    timing: "Week 3",
    body: "One field, explicit consent, and a deletion path that works — only after review.",
    state: "Next",
  },
  {
    phase: "P3",
    title: "App foundation",
    timing: "Weeks 4–6",
    body: "A local-first app shell with sensor-free sessions, a simulator, and data controls.",
    state: "Planned",
  },
  {
    phase: "P4",
    title: "Device loop",
    timing: "Weeks 6–9",
    body: "One development kit behind a typed adapter, with honest signal-quality states.",
    state: "Planned",
  },
  {
    phase: "P5",
    title: "Small trial",
    timing: "Weeks 10–12",
    body: "Five to ten people, usability and repeat use only. No efficacy claim.",
    state: "Not started",
  },
];

const nonClaims = [
  "We do not claim to measure, transfer, or harmonise “energy”.",
  "We do not diagnose, treat, cure, or prevent any condition.",
  "We do not detect anxiety, depression, or burnout.",
  "We do not infer your emotions from a sensor reading.",
  "We do not promise a launch date, a price, or a delivery date.",
  "We do not present simulated logins, payments, or stock as real.",
];

export default function ConceptStatusPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-cream/60">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-20">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-ink">
              Concept status
            </p>
            <span className="rounded-full border border-ink/15 px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-muted">
              Updated 21 November 2026
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl leading-[1.08] tracking-[-0.02em] sm:text-6xl">
            What exists today.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
            AuraSync is an early wellness concept, not a product. This page is
            the honest inventory: what has been built, what is in progress, and
            what has not started. It will change as the work does.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <section className="py-16">
          <div className="overflow-x-auto rounded-2xl border border-ink/10">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Current status of each AuraSync surface
              </caption>
              <thead className="bg-sand/60 text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Surface
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    What that means
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 bg-paper">
                {surfaces.map((row) => (
                  <tr key={row.name} className="align-top">
                    <th
                      scope="row"
                      className="px-5 py-5 text-sm font-medium text-ink"
                    >
                      {row.name}
                    </th>
                    <td className="px-5 py-5">
                      <Status tone={row.tone}>{row.status}</Status>
                    </td>
                    <td className="px-5 py-5 text-muted">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted">
            “In review” means the work is complete enough to be reviewed, not
            approved or launched. Nothing on this page is a commitment to a date.
          </p>
        </section>

        <section className="border-t border-ink/10 py-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-ink">
                Sequence
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-[-0.01em] sm:text-4xl">
                The next five moves.
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-5 text-muted">
              Working targets, not promises. A phase does not start until the
              one before it passes its review.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {roadmap.map((item) => (
              <article
                key={item.phase}
                className="flex h-full flex-col rounded-2xl border border-ink/10 bg-paper p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-lg text-clay-ink">
                    {item.phase}
                  </span>
                  <span className="text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                    {item.state}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                  {item.timing}
                </p>
                <p className="mt-3 text-xs leading-5 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-ink/10 py-16">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-ink">
                Boundaries
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                What we will not claim.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
                These are not marketing caveats. They are the limits of the
                concept, written down before anyone is asked to believe
                anything.
              </p>
            </div>
            <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {nonClaims.map((claim) => (
                <li
                  key={claim}
                  className="flex gap-3 border-t border-ink/15 pt-4 text-sm leading-6 text-muted"
                >
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                  {claim}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-ink/10 py-16">
          <div className="rounded-2xl border border-ink/10 bg-cream/60 p-7 sm:p-9">
            <h2 className="font-display text-2xl sm:text-3xl">
              How decisions get made.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
              Product scope, public wording, data collection, and launch
              readiness are separate decisions with named owners. A design
              document is not approval. A working URL is not launch. Where a
              decision is unresolved, this site says so rather than filling the
              gap with a promise.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/how-it-works"
                className="rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink/35"
              >
                How it works
              </Link>
              <Link
                href="/privacy"
                className="rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink/35"
              >
                What this site collects
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
