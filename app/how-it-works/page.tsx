import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How the AuraSync concept is intended to work: sense a small set of body signals, show them honestly, and offer a breathing practice the user controls.",
};

const signals = [
  {
    signal: "Pulse and HRV estimates",
    shows: "How heart rate and its variability change over time, alongside activity",
    cannot: "Whether you are stressed, calm, anxious, or unwell",
  },
  {
    signal: "Skin conductance",
    shows: "Changes in sweat-gland activity at the skin",
    cannot: "Your emotional state, or what caused a change",
  },
  {
    signal: "Skin temperature",
    shows: "Temperature at the surface of the wrist",
    cannot: "Core body temperature, fever, or illness",
  },
  {
    signal: "Movement",
    shows: "Whether you are still or active during a reading",
    cannot: "Why you are moving, or what it means",
  },
];

const sessionSteps = [
  "You open the app and choose a session. Connecting a device is optional.",
  "The app states plainly whether a device is connected and whether a reading is available.",
  "If a reading is available, you see the value with its quality. If not, you see a gap.",
  "You start the breathing session yourself. Pause and stop are always visible.",
  "When you finish, only the session details you approved are kept — on the phone.",
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-cream/60">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-ink">
            How it works
          </p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl leading-[1.08] tracking-[-0.02em] sm:text-6xl">
            Sense. Notice. Breathe.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
            This page describes the intended interaction of a concept, not a
            finished product. No device has been selected, and no reading is
            available through this website.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <article className="grid gap-8 border-b border-ink/10 py-16 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
          <div>
            <p className="font-display text-5xl text-clay-ink">01</p>
            <h2 className="mt-4 font-display text-3xl tracking-[-0.01em]">
              Sense
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-7 text-muted">
              The concept starts with a small, deliberate set of signals from a
              wrist-worn development device. The aim is not to explain you to
              yourself. It is to give you a plain view of a few things a
              wearable can actually observe, and to be clear about everything it
              cannot.
            </p>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-ink/10 bg-paper">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Signals the concept intends to explore, what they may show,
                  and what they cannot tell you
                </caption>
                <thead className="bg-sand/60 text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Signal
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      What it may show
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      What it cannot tell you
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {signals.map((row) => (
                    <tr key={row.signal} className="align-top">
                      <th
                        scope="row"
                        className="px-5 py-4 text-sm font-medium text-ink"
                      >
                        {row.signal}
                      </th>
                      <td className="px-5 py-4 text-muted">{row.shows}</td>
                      <td className="px-5 py-4 text-muted">{row.cannot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 max-w-2xl text-xs leading-5 text-muted">
              Signals vary with activity, fit, skin contact, temperature, and
              individual differences. A value being displayed does not make it
              meaningful, which is why the app is intended to show a quality
              state beside every estimate.
            </p>
          </div>
        </article>

        <article className="grid gap-8 border-b border-ink/10 py-16 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
          <div>
            <p className="font-display text-5xl text-clay-ink">02</p>
            <h2 className="mt-4 font-display text-3xl tracking-[-0.01em]">
              Notice
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-7 text-muted">
              The app shows what it has, in three honest states: good, limited,
              or unavailable. It does not convert a reading into a mood, a
              stress score, or a prediction. Those would be interpretations the
              concept cannot support.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Good", "Signal quality meets the agreed threshold. The estimate is shown with its timestamp."],
                ["Limited", "Something is interfering — movement, poor contact, or a weak signal. The value is qualified."],
                ["Unavailable", "The app does not have a trustworthy reading. It shows a gap, not a guess."],
              ].map(([state, copy]) => (
                <div
                  key={state}
                  className="rounded-2xl border border-ink/10 bg-paper p-5"
                >
                  <p className="text-sm font-semibold">{state}</p>
                  <p className="mt-2 text-xs leading-5 text-muted">{copy}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">
              Self-reported check-ins, if they are added later, stay separate
              from sensor data. You would be able to edit or delete them, and
              the app would never fill in an answer you did not give.
            </p>
          </div>
        </article>

        <article className="grid gap-8 border-b border-ink/10 py-16 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
          <div>
            <p className="font-display text-5xl text-clay-ink">03</p>
            <h2 className="mt-4 font-display text-3xl tracking-[-0.01em]">
              Breathe
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-7 text-muted">
              A guided breathing session is the one part of the concept that
              does not need a device at all. It is intended to be simple,
              interruptible, and always under your control.
            </p>

            <ol className="mt-8 space-y-4">
              {sessionSteps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-ink/15 text-xs text-clay-ink">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-muted">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-2xl border border-ink/10 bg-cream/60 p-6">
              <h3 className="text-sm font-semibold">A note on safety</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                AuraSync is a wellness concept, not a crisis service or a
                medical device. It is not intended to diagnose, treat, or
                manage any condition. If you are struggling with your mental
                health, please contact a qualified professional or a local
                support service.
              </p>
            </div>
          </div>
        </article>

        <section className="grid gap-6 py-16 md:grid-cols-2">
          <div className="rounded-2xl border border-ink/10 bg-paper p-7">
            <h2 className="font-display text-2xl">Privacy by default</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              The prototype is designed to keep measurements on the phone, with
              no account and no cloud sync. Raw sensor streams are not intended
              to be stored. If that changes, it would require a new purpose, a
              reviewed notice, explicit consent, and a deletion path before any
              collection begins.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-paper p-7">
            <h2 className="font-display text-2xl">Accessible by design</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Controls are intended to work with a keyboard and a screen reader,
              sessions can be stopped immediately, and measurements must be
              readable without relying on colour alone. Permission refusal,
              offline use, and a sensor-free path are treated as first-class
              states, not edge cases.
            </p>
          </div>
        </section>
      </div>

      <section className="border-t border-ink/10 bg-ink text-cream">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl">
              Still a concept. That is the point.
            </h2>
            <p className="mt-2 text-sm text-cream/55">
              Read exactly what exists, what does not, and what we will not
              claim.
            </p>
          </div>
          <Link
            href="/concept-status"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-[#f0b25c] sm:self-auto"
          >
            Concept status
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
