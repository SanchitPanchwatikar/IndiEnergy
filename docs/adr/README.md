# Architecture Decision Records

> **Document control:** Version 0.1 | Status: Working log | Owner: CTO / technical lead (TBD) | Last reviewed: 2026-11-20

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
| ADR-0001 | What V1 product boundary, claims, target user, and market are approved? | F0.1–F0.4 | Not started | Founder (TBD) | Link approved brief and claims matrix |
| ADR-0002 | What application boundaries and minimum technical architecture fit the approved scope? | F2.1–F2.2 | Not started | CTO / founder (TBD) | Link repository baseline, options, and cost review |
| ADR-0003 | What personal data is needed, where is it processed, and what are the retention/deletion rules? | F1.7, F2.3, F4.4–F4.5 | Not started | Privacy owner / founder (TBD) | Link data inventory, qualified review, and retention schedule |
| ADR-0004 | Which development device, SDK/protocol, signals, and quality thresholds are selected? | F1.2, F4.2–F4.3 | Not started | Device lead / CTO (TBD) | Link vendor comparison and bench results |
| ADR-0005 | Are accounts, cloud sync, or centralized sensor storage necessary? | F4.5 | Not started | Founder / privacy owner (TBD) | Link user need and data-flow/security review |
| ADR-0006 | Which hosting, deployment, observability, and recovery approach is approved? | F2.4, F3.4, F7.6 | Not started | CTO / operations owner (TBD) | Link cost, region, threat model, and runbooks |
| ADR-0007 | Is paid commerce in scope, and which payment/fulfillment design is approved? | F0.4, F7.3 | Not started | Founder / finance owner (TBD) | Link legal, tax, inventory, and provider review |

## Creating and reviewing an ADR

1. Copy `template.md` to the next sequential `NNNN-short-title.md`; never reuse an ID.
2. Link the ADR from this register and the relevant row in `docs/delivery/implementation-tracker.md`.
3. Keep the decision Proposed until named approvers and evidence are recorded.
4. On change, create a successor ADR and mark the earlier record Superseded; do not erase decision history.
