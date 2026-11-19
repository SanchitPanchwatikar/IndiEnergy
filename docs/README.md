# AuraSync architecture and delivery documents

> **Document control:** Version 0.2 | Status: Index | Owner: Delivery lead (TBD) | Last reviewed: 2026-11-20

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
