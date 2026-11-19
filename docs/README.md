# AuraSync architecture and delivery documents

These are **proposed, unapproved design documents** based on [the Qwen implementation backlog](../QWEN_IMPLEMENTATION_TASKS.md). The repository currently contains no application implementation, so these documents avoid selecting a programming stack, cloud, device, payment provider, or regulatory classification as a settled fact.

## Document set

| Role / purpose | Document |
|---|---|
| CTO strategy, sequencing, ownership, and scorecard | [CTO Strategy](strategy/cto-strategy.md) |
| Enterprise capabilities, boundaries, information, and transition architecture | [Enterprise Architecture](architecture/enterprise-architecture.md) |
| Pre-launch website and waitlist | [Solution Design 01: Pre-launch Experience](solution-design/01-prelaunch-experience.md) |
| Phone app and wellness interaction loop | [Solution Design 02: Companion App](solution-design/02-companion-app.md) |
| Wrist-device integration and sensor-data handling | [Solution Design 03: Device and Data](solution-design/03-device-and-data.md) |
| Production platform, security, and operations | [Solution Design 04: Production Operations](solution-design/04-production-operations.md) |
| Reusable Qwen coding prompts and execution contract | [Qwen Prompt Engineering](prompts/qwen-prompt-engineering.md) |

## Governance

- Treat each design as a starting point for an Architecture Decision Record (ADR), not permission to build or deploy.
- Founder approval is required for product scope, claims, launch market, user data collection, paid services, and production release.
- Qualified safety, privacy, security, legal, regulatory, and hardware reviewers must approve matters in their remit.
- Record decisions, owners, evidence, and date in the relevant ADR or task before changing a proposed design to **Approved**.
