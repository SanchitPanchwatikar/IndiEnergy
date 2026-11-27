# AuraSync Implementation Tracker

> **Document control:** Version 0.5 | Status: Active register — P0 decisions proposed, P1 site in progress, five unapproved external drafts recorded | Owner: Delivery lead (TBD) | Last reviewed: 2026-11-27

This is the authoritative status, ownership, evidence, blocker, and traceability register for [`QWEN_IMPLEMENTATION_TASKS.md`](../../QWEN_IMPLEMENTATION_TASKS.md). The checkboxes in the backlog are a convenience only; update this register when work starts or finishes.

## Rules

- Status values: **Not started**, **In progress**, **Blocked**, **Done**, **Deferred**.
- Assign one accountable owner before setting a task In progress.
- A task is Done only when its acceptance criteria are met and evidence is linked. Required founder or qualified approvals must be recorded, not inferred.
- For Blocked/Deferred, record the missing decision, dependency, approver, and next review date.
- Phase order and task IDs are strict: work on the next task in ID order, one task at a time. If it is blocked, stop; continue out of sequence only after the founder records an explicit exception and rationale. Never start a later phase before its gate is approved.
- Link evidence to a reviewable artifact (PR, test report, decision, signed review, or deployment record). Do not put secrets or raw user/sensor data in this tracker.

## Tracker

| Task | Status | Owner | Evidence / approval | Blocker / dependency | Design trace |
|---|---|---|---|---|---|
| [F0.1](../../QWEN_IMPLEMENTATION_TASKS.md) — Choose first customer/use case | In progress | Founder | [ADR-0008](../adr/0008-first-customer-and-job.md) (Proposed) | Founder sign-off and interview evidence pending | [CTO strategy](../strategy/cto-strategy.md) |
| [F0.2](../../QWEN_IMPLEMENTATION_TASKS.md) — Approve V1 feature boundary | In progress | Founder | [ADR-0009](../adr/0009-v1-feature-boundary.md) (Proposed) | Founder sign-off pending | [CTO strategy](../strategy/cto-strategy.md), [enterprise architecture](../architecture/enterprise-architecture.md) |
| [F0.3](../../QWEN_IMPLEMENTATION_TASKS.md) — Approve claims and terminology | In progress | Founder | [ADR-0010](../adr/0010-public-claims-ceiling.md) (Proposed); site copy written to concept-only ceiling | Qualified claims review pending | [claims matrix](../product/claims-matrix.md) |
| [F0.4](../../QWEN_IMPLEMENTATION_TASKS.md) — Decide launch geography and commercial model | In progress | Founder | [ADR-0011](../adr/0011-launch-market-and-commercial-model.md) (Proposed) | Qualified legal review pending | [CTO strategy](../strategy/cto-strategy.md), [commerce gate](../solution-design/04-production-operations.md) |
| [F1.1](../../QWEN_IMPLEMENTATION_TASKS.md) — Test problem and user need | Not started | Unassigned | — | F0.1 | [CTO strategy](../strategy/cto-strategy.md) |
| [F1.2](../../QWEN_IMPLEMENTATION_TASKS.md) — Verify sensor/device feasibility | Not started | Unassigned | — | F0.2 | [device and data](../solution-design/03-device-and-data.md) |
| [F1.3](../../QWEN_IMPLEMENTATION_TASKS.md) — Define hazards and foreseeable misuse | Not started | Unassigned | — | F0.2 | [safety-event runbook](../operations/safety-event-runbook.md), [device and data](../solution-design/03-device-and-data.md) |
| [F1.4](../../QWEN_IMPLEMENTATION_TASKS.md) — Obtain market-specific review | Not started | Unassigned | — | F0.3, F0.4 | [enterprise architecture](../architecture/enterprise-architecture.md) |
| [F1.5](../../QWEN_IMPLEMENTATION_TASKS.md) — Define study/outcome plan | Not started | Unassigned | — | F0.1, F1.4 | [CTO strategy](../strategy/cto-strategy.md) |
| [F1.6](../../QWEN_IMPLEMENTATION_TASKS.md) — Validate competitors and alternatives | Not started | Unassigned | — | F0.1 | [CTO strategy](../strategy/cto-strategy.md) |
| [F1.7](../../QWEN_IMPLEMENTATION_TASKS.md) — Define retention schedule and owner | Not started | Unassigned | — | F0.4, F1.4 | [enterprise architecture](../architecture/enterprise-architecture.md), [waitlist design](../solution-design/01-prelaunch-experience.md) |
| [F2.1](../../QWEN_IMPLEMENTATION_TASKS.md) — Inventory repository and mock-up | Not started | Unassigned | — | — | [prototype README](../prototypes/README.md) |
| [F2.2](../../QWEN_IMPLEMENTATION_TASKS.md) — Propose minimum architecture | Not started | Unassigned | — | F0.2, F2.1 | [enterprise architecture](../architecture/enterprise-architecture.md), ADR-0002 |
| [F2.3](../../QWEN_IMPLEMENTATION_TASKS.md) — Define privacy/security requirements | Not started | Unassigned | — | F1.4, F1.7 | [enterprise architecture](../architecture/enterprise-architecture.md), ADR-0003 |
| [F2.4](../../QWEN_IMPLEMENTATION_TASKS.md) — Establish engineering checks | Not started | Unassigned | — | F2.1, F2.2 | [production operations](../solution-design/04-production-operations.md) |
| [F2.5](../../QWEN_IMPLEMENTATION_TASKS.md) — Set accessibility requirements | Not started | Unassigned | — | F0.1, F2.1 | [pre-launch experience](../solution-design/01-prelaunch-experience.md), [companion app](../solution-design/02-companion-app.md) |
| [F3.1](../../QWEN_IMPLEMENTATION_TASKS.md) — Align site with approved V1/claims | In progress | Founder / web engineering | Next.js scaffold, tokens, CI workflow, and home/how-it-works/status pages, committed and pushed to `main` at `69b3e74` with CI passing (run 44993803451); [copy audit](../product/website-copy-register.md) maps every block to the matrix — no unapproved assertion, 2 accuracy items open | F0.3 approval and copy sign-off | [claims matrix](../product/claims-matrix.md), [pre-launch experience](../solution-design/01-prelaunch-experience.md), [ADR-0012](../adr/0012-website-and-prototype-stack.md) |
| [F3.2](../../QWEN_IMPLEMENTATION_TASKS.md) — Implement waitlist flow | Not started | Unassigned | — | F1.7, F2.3, F3.1 | [pre-launch experience](../solution-design/01-prelaunch-experience.md) |
| [F3.3](../../QWEN_IMPLEMENTATION_TASKS.md) — Add public-site operational basics | Not started | Unassigned | — | F2.5, F3.1 | [pre-launch experience](../solution-design/01-prelaunch-experience.md) |
| [F3.4](../../QWEN_IMPLEMENTATION_TASKS.md) — Deploy preview | Not started | Unassigned | — | F2.4, F3.1–F3.3 | [production operations](../solution-design/04-production-operations.md) |
| [F4.1](../../QWEN_IMPLEMENTATION_TASKS.md) — Build app shell/onboarding | Not started | Unassigned | — | F2.2, F2.5 | [companion app](../solution-design/02-companion-app.md) |
| [F4.2](../../QWEN_IMPLEMENTATION_TASKS.md) — Add typed device adapter | Not started | Unassigned | — | F1.2, ADR-0004 | [device and data](../solution-design/03-device-and-data.md) |
| [F4.3](../../QWEN_IMPLEMENTATION_TASKS.md) — Validate signal quality/metrics | Not started | Unassigned | — | F1.2, F4.2 | [device and data](../solution-design/03-device-and-data.md), [claims matrix](../product/claims-matrix.md) |
| [F4.4](../../QWEN_IMPLEMENTATION_TASKS.md) — Add consent-based check-ins/history | Not started | Unassigned | — | F1.7, F2.3, F4.1 | [companion app](../solution-design/02-companion-app.md) |
| [F4.5](../../QWEN_IMPLEMENTATION_TASKS.md) — Decide on accounts/cloud sync | Not started | Unassigned | — | F2.3, F4.2–F4.4 | ADR-0005, [enterprise architecture](../architecture/enterprise-architecture.md) |
| [F5.1](../../QWEN_IMPLEMENTATION_TASKS.md) — Implement user-controlled guidance | Not started | Unassigned | — | F4.1 | [companion app](../solution-design/02-companion-app.md) |
| [F5.2](../../QWEN_IMPLEMENTATION_TASKS.md) — Add approved optional haptics | Not started | Unassigned | — | F1.3, F1.2, F4.2 | [device and data](../solution-design/03-device-and-data.md) |
| [F5.3](../../QWEN_IMPLEMENTATION_TASKS.md) — Add explainable response rules | Not started | Unassigned | — | F0.3, F4.3, F5.1 | [companion app](../solution-design/02-companion-app.md), [claims matrix](../product/claims-matrix.md) |
| [F5.4](../../QWEN_IMPLEMENTATION_TASKS.md) — Run internal bench/usability tests | Not started | Unassigned | — | F1.2, F1.3, F4.2–F5.3 | [device and data](../solution-design/03-device-and-data.md) |
| [F5.5](../../QWEN_IMPLEMENTATION_TASKS.md) — Prepare pilot release | Not started | Unassigned | — | F1.5, F1.7, F2.3, F5.4 | [companion app](../solution-design/02-companion-app.md), [safety-event runbook](../operations/safety-event-runbook.md) |
| [F6.1](../../QWEN_IMPLEMENTATION_TASKS.md) — Conduct approved pilot | Not started | Unassigned | — | Phase gate 5 | [CTO strategy](../strategy/cto-strategy.md), [safety-event runbook](../operations/safety-event-runbook.md) |
| [F6.2](../../QWEN_IMPLEMENTATION_TASKS.md) — Analyze and document results | Not started | Unassigned | — | F6.1 | [CTO strategy](../strategy/cto-strategy.md), [claims matrix](../product/claims-matrix.md) |
| [F6.3](../../QWEN_IMPLEMENTATION_TASKS.md) — Revisit unit economics/manufacturing | Not started | Unassigned | — | F0.4, F6.2 | [CTO strategy](../strategy/cto-strategy.md) |
| [F6.4](../../QWEN_IMPLEMENTATION_TASKS.md) — Freeze production-candidate hardware requirements | Not started | Unassigned | — | F1.2, F1.3, F6.2 | [device and data](../solution-design/03-device-and-data.md) |
| [F7.1](../../QWEN_IMPLEMENTATION_TASKS.md) — Harden application and APIs | Not started | Unassigned | — | Phase gate 6, F2.3 | [production operations](../solution-design/04-production-operations.md) |
| [F7.2](../../QWEN_IMPLEMENTATION_TASKS.md) — Replace prototype integrations | Not started | Unassigned | — | F7.1, F0.4 | [pre-launch experience](../solution-design/01-prelaunch-experience.md), [production operations](../solution-design/04-production-operations.md) |
| [F7.3](../../QWEN_IMPLEMENTATION_TASKS.md) — Add commerce only if approved | Not started | Unassigned | — | F0.4, F6.3, F7.2 | ADR-0007, [production operations](../solution-design/04-production-operations.md) |
| [F7.4](../../QWEN_IMPLEMENTATION_TASKS.md) — Complete device verification/certifications | Not started | Unassigned | — | F6.4 | [device and data](../solution-design/03-device-and-data.md) |
| [F7.5](../../QWEN_IMPLEMENTATION_TASKS.md) — Run product quality checks | Not started | Unassigned | — | F7.1–F7.4 as applicable | [production operations](../solution-design/04-production-operations.md) |
| [F7.6](../../QWEN_IMPLEMENTATION_TASKS.md) — Establish production operations | Not started | Unassigned | — | F2.4, F7.1 | [production operations](../solution-design/04-production-operations.md), [safety-event runbook](../operations/safety-event-runbook.md) |
| [F7.7](../../QWEN_IMPLEMENTATION_TASKS.md) — Complete final legal/claims review | Not started | Unassigned | — | F0.3, F1.4, F7.4 | [claims matrix](../product/claims-matrix.md) |
| [F8.1](../../QWEN_IMPLEMENTATION_TASKS.md) — Run readiness review | Not started | Unassigned | — | Phase gate 7 | [production operations](../solution-design/04-production-operations.md) |
| [F8.2](../../QWEN_IMPLEMENTATION_TASKS.md) — Launch to approved small cohort | Not started | Unassigned | — | F8.1 | [production operations](../solution-design/04-production-operations.md), [safety-event runbook](../operations/safety-event-runbook.md) |
| [F8.3](../../QWEN_IMPLEMENTATION_TASKS.md) — Expand availability deliberately | Not started | Unassigned | — | F8.2 | [CTO strategy](../strategy/cto-strategy.md) |
| [F8.4](../../QWEN_IMPLEMENTATION_TASKS.md) — Operate and improve | Not started | Unassigned | — | F8.2 | [production operations](../solution-design/04-production-operations.md), [safety-event runbook](../operations/safety-event-runbook.md) |

## Unapproved external inputs

On 2026-11-26 the five HEW solution-design drafts below were imported verbatim (each with only a repository-status header added). They are **not approved**, they are not tasks in the table above, and nothing in them is scheduled work. The register records them so the imported set and the conflicts it raises are visible, not because any part of it has been adopted.

Rules for these rows:

- No draft may be cited as design trace for a task in the table above until the conflict it depends on is settled by an ADR.
- Status stays **Deferred** until the founder records the decision and, where stated, qualified review.
- Approved decisions are recorded in the [ADR log](../adr/README.md) with this repository's ADR-0001…ADR-0012 numbering, not the drafts' ADR-001…ADR-014 numbering.
- **The conflicts themselves are not described here.** [docs/README.md § Open conflicts](../README.md#open-conflicts-in-the-imported-hew-drafts) is their single source: it holds each conflict's ID (OC-1…OC-6), both sides of the disagreement, and the decision it needs. This table only maps each draft to the OC IDs that block it, so recording a decision means editing the source row and the ADR — never this table.

| Imported document | Status | Owner | Blocked by | Decision record |
|---|---|---|---|---|
| [SDD-01 wrist unit](../solution-design/sdd-01-wrist-unit.md) — hardware and firmware, W-Lite vs W-Thermal | Deferred — unapproved external input | Founder | OC-1, OC-2, OC-6 | None — ADR pending |
| [SDD-03 cloud and data platform](../solution-design/sdd-03-cloud-data-platform.md) — AWS reference, regional cells, ingestion, OTA, deletion | Deferred — unapproved external input | Founder | OC-3, OC-4, OC-6 | None — ADR pending |
| [SDD-04 closed-loop engine](../solution-design/sdd-04-closed-loop-engine.md) — ARM state, interventions I-01…I-08, rule policy, decision log | Deferred — unapproved external input | Founder | OC-2, OC-6; its reason strings also need [claims-matrix](../product/claims-matrix.md) approval | None — ADR pending |
| [SDD-05 security, privacy, safety and compliance](../solution-design/sdd-05-security-privacy-compliance.md) — STRIDE, consent matrix, DPIA, hazards H-01…H-11, proposed ADR-013/ADR-014 | Deferred — unapproved external input | Founder | OC-5, OC-6 | None — ADR pending |
| [SDD-06 validation and pilot system](../solution-design/sdd-06-validation-pilot-system.md) — crossover vs parallel design, yoked sham, randomisation, adverse-event workflow, gate G2 rules | Deferred — unapproved external input | Founder | OC-2, OC-3, OC-6 | None — ADR pending |

