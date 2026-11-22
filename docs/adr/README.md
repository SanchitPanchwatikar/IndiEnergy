# Architecture Decision Records

> **Document control:** Version 0.2 | Status: Working log — P0 decisions proposed | Owner: CTO / technical lead (TBD) | Last reviewed: 2026-11-21

An ADR records one consequential decision and its trade-offs. These entries are **planned questions**, not accepted decisions. Do not treat this log or another proposal as implementation authorization.

## Status definitions

- **Not started:** decision is identified but not yet investigated.
- **Proposed:** options and recommendation are ready for review.
- **Accepted:** authorized decision-makers approved the decision and its consequences.
- **Rejected:** considered and declined; retain rationale.
- **Superseded:** replaced by a later ADR; link the replacement.

Every ADR must identify an owner, approver(s), linked backlog task(s), evidence, and review triggers. Update this log when a decision changes. Use the [ADR template](template.md); do not silently promote a proposed architecture document to an accepted decision.

## Decision register

| ADR | Decision question | Related tasks | Status | Owner / approver | Evidence / review |
|---|---|---|---|---|---|
| ADR-0001 | What V1 product boundary, claims, target user, and market are approved? | F0.1–F0.4 | Proposed — split into ADR-0008–0011 for review | Founder (TBD) | Umbrella question; see split records below |
| ADR-0002 | What application boundaries and minimum technical architecture fit the approved scope? | F2.1–F2.2 | Not started | CTO / founder (TBD) | Link repository baseline, options, and cost review |
| ADR-0003 | What personal data is needed, where is it processed, and what are the retention/deletion rules? | F1.7, F2.3, F4.4–F4.5 | Not started | Privacy owner / founder (TBD) | Link data inventory, qualified review, and retention schedule |
| ADR-0004 | Which development device, SDK/protocol, signals, and quality thresholds are selected? | F1.2, F4.2–F4.3 | Not started | Device lead / CTO (TBD) | Link vendor comparison and bench results |
| ADR-0005 | Are accounts, cloud sync, or centralized sensor storage necessary? | F4.5 | Not started | Founder / privacy owner (TBD) | Link user need and data-flow/security review |
| ADR-0006 | Which hosting, deployment, observability, and recovery approach is approved? | F2.4, F3.4, F7.6 | Not started | CTO / operations owner (TBD) | Link cost, region, threat model, and runbooks |
| ADR-0007 | Is paid commerce in scope, and which payment/fulfillment design is approved? | F0.4, F7.3 | Not started | Founder / finance owner (TBD) | Link legal, tax, inventory, and provider review |
| [ADR-0008](0008-first-customer-and-job.md) | Who is the first customer, and what job are we designing for? | F0.1, F1.1, F1.6 | Proposed | Founder | Awaiting founder approval and interview evidence |
| [ADR-0009](0009-v1-feature-boundary.md) | What is included in and excluded from V1? | F0.2, F2.2, F4.1–F4.5, F5.1–F5.3 | Proposed | Founder / CTO | Awaiting founder and technical approval |
| [ADR-0010](0010-public-claims-ceiling.md) | What public wording is permitted before claims are approved? | F0.3, F3.1, F5.3, F7.7 | Proposed | Founder / qualified claims reviewer | Awaiting review; no claim approved |
| [ADR-0011](0011-launch-market-and-commercial-model.md) | Which market and commercial model apply to V1? | F0.4, F1.4, F1.7, F7.3 | Proposed | Founder / qualified legal reviewer | India and non-paid waitlist treated as assumptions |
| [ADR-0012](0012-website-and-prototype-stack.md) | Which technology baseline applies to the website and prototype? | F2.1, F2.2, F2.4, F3.1–F3.4 | Proposed | Founder / CTO | Scaffold builds; hosting remains ADR-0006 |

On 2026-11-21 the planned umbrella question in ADR-0001 was split into ADR-0008–ADR-0011 so each P0 decision has its own reviewable record. ADR-0002–ADR-0007 keep their original IDs and questions. New IDs are appended; no ID is reused.

## Creating and reviewing an ADR

1. Copy `template.md` to the next sequential `NNNN-short-title.md`; never reuse an ID.
2. Link the ADR from this register and the relevant row in `docs/delivery/implementation-tracker.md`.
3. Keep the decision Proposed until named approvers and evidence are recorded.
4. On change, create a successor ADR and mark the earlier record Superseded; do not erase decision history.
