# Website Copy Register — Claims Matrix Mapping

> **Document control:** Version 0.2 | Status: Draft audit — no claim approved | Owner: Founder / product copy owner | Last reviewed: 2026-11-21 (audit date)

This register maps the public copy on the P1 website to the [claims matrix](claims-matrix.md), as required by [ADR-0010](../adr/0010-public-claims-ceiling.md) ("every public claim must map to a claims-matrix row"). It is an audit record, not an approval. No claim in the matrix has an evidence link, an approver, or a market recorded, so **no benefit, outcome, diagnostic, or measurement claim is approved for publication**.

## Scope and method

- **Pages audited:** `/` (home), `/how-it-works`, `/concept-status`, `/privacy`, `/terms`.
- **State audited:** the working tree on 2026-11-21, before commit and before any deployment. At audit time nothing had been pushed or published; the work has since been committed and pushed to `main` (`69b3e74`, CI passing) and remains undeployed.
- **Ceiling applied:** ADR-0010 Option A — concept-only factual description, explicit non-claims, C-002-type feature description, and C-001-type measurement description with a quality caveat. Benefit language (C-003) is excluded entirely.
- **Method:** each block of claims-bearing copy was read on the page and mapped to a matrix row, to "non-claim", or to "no claim" (governance/status/navigation text). Copy was also scanned for the terms `energy, detect, diagnose, treat, cure, prevent, stress, anxiety, depression, burnout, calm, proven, clinical, reduce, improve, relieve, benefit, guarantee, track, monitor, measure`. Every hit was then classified as an assertion, a negation, or a stated limitation.

## Result

| Result | Count |
|---|---|
| Copy blocks asserting a claim that needs matrix approval | 0 |
| Copy blocks mapping to an unapproved matrix row, written within the concept ceiling | 8 |
| Copy blocks that are explicit non-claims (negations) | 12 |
| Copy blocks that make no claim (status, governance, navigation, legal) | remainder |
| C-003 benefit wording found | 0 |
| C-005 / C-006 assertions found | 0 (prohibited phrases appear only inside negations) |
| Unresolved copy items | 2 (see Open items) |

## Mapping by page

Status column uses the matrix's own states. "Within ceiling" means the copy stays inside ADR-0010 Option A and does not need a new approval; it does **not** upgrade the matrix row.

### `/` — home

| Copy block | Matrix mapping | Status | Note |
|---|---|---|---|
| Eyebrow "Concept · In development"; H1 "A quieter way to notice how you feel." | No claim | — | Framing only; asserts no measurement, benefit, or outcome. |
| Hero paragraph: "…a wrist-worn sensor, a phone app, and a simple breathing practice…" | Concept description; touches C-002 | C-002 — Proposed | Describes the concept, not a capability or an effect. |
| "No product for sale. No medical claims. No data collected here." | Non-claim | — | Prevents an offer-for-sale reading. |
| Section strip "What this is not": "Not a medical device. It does not diagnose, treat, or measure 'energy'." | Non-claim; C-005, C-006 | Prohibited (stated as negation) | The word "energy" appears only to deny measuring it. |
| "Why we are building" H2: "…testing whether a physical signal and a short breathing practice can ask for less." | No claim — hypothesis | — | Written as a question under test, not a result. |
| Body: "We are not claiming it reduces stress or improves health…" | Non-claim; C-003 | Evidence needed (deliberately not asserted) | Explicit disclaimer of the C-003 benefit claim. |
| Step 01 Sense: "intended to read pulse, skin conductance, skin temperature, and movement… estimates with a quality flag — never as a diagnosis." | C-001 | Evidence needed | Intent tense + required quality qualifier + explicit denial of diagnosis. Closest copy to the C-001 ceiling; still unapproved. |
| Step 02 Notice: "You see your own signals, plainly. No mood label, no stress score…" | C-004 partial + non-claim | Evidence needed (not asserted as delivered) | Describes display intent and names what is excluded. |
| Step 03 Breathe: "a guided breathing session gives your attention somewhere simple to rest. You start it, and you can stop it at any time." | C-002 | Proposed | User control, no guaranteed effect. |
| Principles: "Your permission", "Local-first", "Honest signals" | No claim — design intent | — | Privacy and honesty intent; no capability assertion. |
| "Where we are" list (Concept defined / This website / app / device / trial) | No claim — project status | — | Status labels only; the trial row says "usability only". |
| FAQ 1: "Can I buy an AuraSync device?" → "No. There is no product for sale…" | Non-claim | — | |
| FAQ 2: "Is this a medical device?" → "No. AuraSync is not intended to diagnose, treat, cure, or prevent any condition." | Non-claim; C-006 | Prohibited (as negation) | |
| FAQ 3: "…may display pulse and HRV estimates… They do not establish whether you are stressed, calm, anxious, or unwell." | C-001 | Evidence needed | Both halves of the ADR-0010 requirement: qualified measurement wording plus denial of the emotional-state inference. |
| FAQ 4: "What does this website collect about me?" → "Nothing." | Non-claim | — | Matches the site as built (no forms, cookies, or analytics). |
| CTA "The build log is public." | No claim | — | **Open item 1.** Factually unverified — see Open items. |

### `/how-it-works`

| Copy block | Matrix mapping | Status | Note |
|---|---|---|---|
| Intro: "This page describes the intended interaction of a concept, not a finished product. No device has been selected…" | Non-claim / status | — | Sets intent tense for the whole page. |
| Signal table, row 1: pulse and HRV — "may show" changes over time; "cannot tell you" whether you are stressed, calm, anxious, or unwell | C-001 | Evidence needed | The "may show / cannot tell you" pairing is the required qualification. |
| Signal table, rows 2–4: skin conductance, skin temperature, movement | Descriptive sensor wording; no matrix row | — | Each row pairs a surface observation with an explicit "cannot" limit. No row claims an emotional or clinical inference. |
| Note: "Signals vary with activity, fit, skin contact, temperature… A value being displayed does not make it meaningful." | C-001 qualification | Evidence needed | Supplies the caveat ADR-0010 requires beside measurement copy. |
| 02 Notice: Good / Limited / Unavailable states | Feature description, adjacent to C-004 | Evidence needed (not asserted as built) | Describes intended display; no interpretation, score, or prediction. |
| "Self-reported check-ins, if they are added later… You would be able to edit or delete them…" | C-004 | Evidence needed | Conditional future wording plus consent/edit/delete qualification. |
| 03 Breathe: five session steps | C-002 | Proposed | Control-first description ("Pause and stop are always visible"); no effect claim. |
| "A note on safety" | Non-claim; C-006 | Prohibited (as negation) | Wellness concept, not a crisis service or medical device. |
| "Privacy by default" | No claim — design intent | — | |
| "Accessible by design" | No claim — design intent | — | **Open item 2.** Intent wording ("are intended to work…"), not a verified conformance statement. |

### `/concept-status`

| Copy block | Matrix mapping | Status | Note |
|---|---|---|---|
| Status table (website, app, device, waitlist, pilot, sales) | No claim — status facts | — | Says waitlist is closed, sales "None", no price or delivery date. |
| Note: "'In review' means the work is complete enough to be reviewed, not approved or launched." | No claim — governance | — | Prevents reading a status label as approval. |
| Roadmap P1–P5 | No claim — sequence | — | P5 states "No efficacy claim." |
| Non-claims list (6 items) | C-001, C-004, C-005, C-006 exclusions | Prohibited / Evidence needed (as negations) | "We do not claim to measure, transfer, or harmonise 'energy'"; "We do not diagnose, treat, cure, or prevent"; "We do not detect anxiety, depression, or burnout"; "We do not infer your emotions from a sensor reading"; no launch/price/delivery promise; no simulated login, payment, or stock. |
| "How decisions get made" | No claim — governance | — | "A design document is not approval. A working URL is not launch." |

### `/privacy` and `/terms`

| Copy block | Matrix mapping | Status | Note |
|---|---|---|---|
| Privacy: "We collect nothing here today"; waitlist intent; local-first app intent | Non-claim | — | Marked "Draft for review"; makes no compliance claim for any market. |
| Terms: "No offer for sale"; "Not medical advice"; content may change; no warranty | Non-claim; C-006 | — | Reinforces that nothing on the site is an offer or medical advice. |

## Prohibited-language scan

The scan ran over `app/` and `components/`. The raw grep returned **56 lines**, but 36 of them matched only because the term `track` also matches Tailwind's `tracking-*` type utilities (e.g. `tracking-[0.22em]`, `tracking-wide`); one further line was the `prefers-reduced-motion: reduce` rule in `app/globals.css`, which is not copy. After removing those, **19 lines of page copy** remained, holding **39 term occurrences**. Classification of every group:

| Term | Lines | Occurrences | Classification |
|---|---|---|---|
| energy | 2 | 2 (`/` strip, `/concept-status` non-claim) | Negation only — "does not measure", "do not claim to measure, transfer, or harmonise". No C-005 mechanism claim. |
| diagnose / treat / cure / prevent | 8 | 20 (`/`, `/how-it-works`, `/terms`, footer) | Negation only — "not intended to diagnose, treat, cure, or prevent". No C-006 claim. |
| detect / anxiety / depression / burnout | 1 | 4 (`/concept-status` non-claim) | Negation only. |
| stress / calm / anxious | 7 | 11 (`/` FAQ and step 02, `/how-it-works` table row and readout note) | Used either to deny inferring an emotional state or to name a prohibited inference. No stress score, mood label, or emotion inference is offered. |
| reduce / improve | 2 | 2 (`/` hypothesis disclaimer) | Negation — "We are not claiming it reduces stress or improves health". No C-003 benefit claim. |
| proven / clinical / guarantee | 0 | 0 | — |

The declared term set also included `measure`, `monitor`, `relieve` and `benefit`. Those add four further lines (`/` measurement caveat, `/how-it-works` local-storage and stop notes, `/privacy`), all neutral engineering or privacy wording with no efficacy claim, for 23 copy lines in total.

One further "treat" occurrence is engineering prose, not a health claim: `/how-it-works` says offline use and a sensor-free path "are treated as first-class" — it is counted above but carries no medical meaning.

No C-005 or C-006 phrase appears outside a negation. No testimonial, study, endorsement, price, launch date, stock level, or simulated authentication/payment flow exists anywhere in the app.

## Open items

1. **"The build log is public."** (`/` closing CTA) — the copy asserts repository visibility, which has not been verified and cannot be until the project is pushed. Before launch: confirm the repository is public, or reword to "The build log will be public."
2. **"Accessible by design."** (`/how-it-works`) — the paragraph is written as intent, and no accessibility audit has been run. Keep the intent tense, or replace it with a specific, verified statement once an audit exists.

Neither item is a claims-matrix violation; both are accuracy items to resolve before deployment.

## Sign-off

| Role | Decision | Date | Notes |
|---|---|---|---|
| Founder / business approver | Pending | | Confirms the mapping and the two open items |
| Qualified claims reviewer for the launch market | Pending | | Required before any benefit or outcome wording is added |
| Product copy owner | Pending | | Re-runs this audit on every copy change |

## Re-review triggers

- Any new sentence that describes a capability, benefit, outcome, measurement, or comparison.
- A new page, waitlist, or app screen with public copy.
- A matrix row moving from Evidence needed to Review required or Approved.
- A change to sensor, device, or app behaviour that the copy describes.
- Any deployment of these pages to a public URL.
