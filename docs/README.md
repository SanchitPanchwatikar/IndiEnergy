# AuraSync architecture and delivery documents

> **Document control:** Version 0.3 | Status: Index | Owner: Delivery lead (TBD) | Last reviewed: 2026-11-26

These are **proposed, unapproved design documents** based on [the Qwen implementation backlog](../QWEN_IMPLEMENTATION_TASKS.md). The repository currently contains no application implementation, so these documents avoid selecting a programming stack, cloud, device, payment provider, or regulatory classification as a settled fact.

## Document set

| Role / purpose | Document |
|---|---|
| CTO strategy, sequencing, ownership, and scorecard | [CTO Strategy](strategy/cto-strategy.md) |
| Enterprise capabilities, boundaries, information, and transition architecture | [Enterprise Architecture](architecture/enterprise-architecture.md) |
| Decision status, owners, and history | [ADR log](adr/README.md) and [ADR template](adr/template.md) |
| Public wording and approval evidence | [Claims matrix](product/claims-matrix.md) |
| Task status, ownership, evidence, and traceability | [Implementation tracker](delivery/implementation-tracker.md) |
| Pre-launch website and waitlist | [Solution Design 01: Pre-launch Experience](solution-design/01-prelaunch-experience.md) |
| Phone app and wellness interaction loop | [Solution Design 02: Companion App](solution-design/02-companion-app.md) |
| Wrist-device integration and sensor-data handling | [Solution Design 03: Device and Data](solution-design/03-device-and-data.md) |
| Production platform, security, and operations | [Solution Design 04: Production Operations](solution-design/04-production-operations.md) |
| Wrist-unit hardware, firmware, actuation and safety path (imported HEW draft) | [SDD-01: Wrist Unit](solution-design/sdd-01-wrist-unit.md) |
| Cloud, ingestion, OTA, deletion and regional cells (imported HEW draft) | [SDD-03: Cloud and Data Platform](solution-design/sdd-03-cloud-data-platform.md) |
| Closed-loop policy, baselines, interventions and learning (imported HEW draft) | [SDD-04: Closed-Loop Engine](solution-design/sdd-04-closed-loop-engine.md) |
| Threats, privacy, consent, hazards and compliance (imported HEW draft) | [SDD-05: Security, Privacy, Safety and Compliance](solution-design/sdd-05-security-privacy-compliance.md) |
| Pilot system, sham design, blinding and analysis (imported HEW draft) | [SDD-06: Validation and Pilot System](solution-design/sdd-06-validation-pilot-system.md) |
| Safety-report escalation | [Safety-event runbook](operations/safety-event-runbook.md) |
| Supplied static storefront (reference only) | [Prototype README](prototypes/README.md) |
| Storefront HTML mock-up (do not deploy) | [aurasync-6-sense-harmonizer-store.html](prototypes/aurasync-6-sense-harmonizer-store.html) |
| Reusable Qwen coding prompts and execution contract | [Qwen Prompt Engineering](prompts/qwen-prompt-engineering.md) |

## Governance

- Treat each design as a starting point for an Architecture Decision Record (ADR), not permission to build or deploy.
- Founder approval is required for product scope, claims, launch market, user data collection, paid services, and production release.
- Qualified safety, privacy, security, legal, regulatory, and hardware reviewers must approve matters in their remit.
- Record decisions, owners, evidence, and date in the relevant ADR or task before changing a proposed design to **Approved**.
- The [implementation tracker](delivery/implementation-tracker.md) is authoritative for task status and evidence; this index is not an approval register.

## Open conflicts in the imported HEW drafts

The five SDD drafts imported under `solution-design/` are an external HEW design set, copied unedited apart from a repository-status header. They are **not approved** and they disagree with decisions already recorded here. None of the conflicts below is resolved by importing the drafts:

| Conflict | Imported drafts say | This repository records |
|---|---|---|
| Product name | HEW, "Human Energy Wearable" | AuraSync throughout the site and documents; "energy" transfer claims are prohibited (C-005 in the [claims matrix](product/claims-matrix.md)) |
| Thermal channel | Warm/cool actuation is designed in full (D-2, W-Thermal, I-03/I-04, hazards H-01/H-02) | [ADR-0009](adr/0009-v1-feature-boundary.md) excludes heaters, thermal actuators and light therapy from V1 |
| Hosting and stack | AWS reference with ECS Fargate, Aurora, S3, Kinesis, Cognito, Terraform and `ap-south-1` | Hosting is TBD under [ADR-0012](adr/0012-website-and-prototype-stack.md); nothing here commits a cloud provider |
| Data posture | Accounts, cloud sync, a data lake and research raw capture are baseline | V1 is local-first with an optional, approved backend only for a demonstrated need |
| ADR numbering | ADR-001…ADR-014, including ADR-013 (tighten-only remote limits) and ADR-014 (signed kill switch) | The [ADR log](adr/README.md) uses ADR-0001…ADR-0012; the drafts' IDs collide and are not registered decisions |
| Missing parents | Every draft cites `00-README.md`, `01-cto-technology-strategy.md`, `02-enterprise-architecture.md` and SDD-02 | `00-README.md` and SDD-02 are not in this repository; the strategy and enterprise-architecture imports are still pending, so the [current strategy](strategy/cto-strategy.md) and [current architecture](architecture/enterprise-architecture.md) remain authoritative |

Each item needs a founder decision recorded as an ADR before any draft is treated as the plan or implemented. Marketing, app strings and reason templates in the drafts stay subject to the [claims matrix](product/claims-matrix.md) and [ADR-0010](adr/0010-public-claims-ceiling.md).
