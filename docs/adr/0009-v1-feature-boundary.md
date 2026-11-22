# ADR-0009: V1 feature boundary

> **Document control:** Version 0.1 | Status: Proposed | Decision owner: Founder | Approver(s): Founder, with technical and safety input | Date: 2026-11-21

## Related work

- Backlog task IDs: F0.2, F2.2, F4.1–F4.5, F5.1–F5.3
- Related solution/enterprise documents: [Companion app design](../solution-design/02-companion-app.md), [device and data design](../solution-design/03-device-and-data.md), [enterprise architecture](../architecture/enterprise-architecture.md)
- Supersedes / superseded by: None

## Context

The concept material describes a broad six-sense platform, including scent, light, thermal, and haptic modules, plus commerce. Building that as V1 would require custom hardware, certifications, and capital before any user evidence exists.

The smallest useful version is a phone app plus one development kit. This ADR fixes that boundary so later requests can be evaluated against it rather than absorbed silently.

**Verified:** no application code exists in the repository; no device has been selected; no payment provider or inventory exists.

## Decision drivers

- Prove the interaction loop before spending on industrial design or inventory.
- Keep every V1 feature testable without medical claims.
- Keep personal data local where practical.
- Make exclusions explicit so scope creep has to be argued, not assumed.

## Options considered

| Option | Benefits | Costs / risks | Evidence or open questions |
|---|---|---|---|
| A. Website + waitlist + app + one dev kit, local-first | Cheapest falsification of the core loop; no hardware manufacturing; privacy story is simple | Requires app engineering and device integration; limited “wow” for investors | No prototype exists yet |
| B. Full six-sense hardware concept | Matches the original narrative; visually compelling | Capital, safety cases, certifications, supply chain, and unsupported claims before evidence | No feasibility, cost, or safety work completed |
| C. App-only breathing product | Fastest to ship; no device risk | Does not test the differentiating sensing premise | Would answer a different question |

## Decision

**Proposed:** Adopt Option A as the V1 boundary.

### Included

- A public concept website with an approved, non-paid waitlist (only after privacy review).
- A companion app built as a local-first prototype: onboarding, permissions, connection state, and a sensor-free path.
- Guided breathing sessions the user starts, pauses, and stops.
- One selected wrist-worn development kit behind a typed adapter, covering pulse/HRV estimates, skin conductance, skin temperature, and movement.
- Signal-quality states (`good`, `limited`, `unavailable`) shown next to every estimate.
- Optional self-reported check-ins, stored separately from sensor measurements.
- Local export and deletion of the user’s own data.
- Optional haptics only if the selected kit supports safe, bounded output and a separate safety review passes.

### Excluded from V1

- Custom or mass-produced hardware; industrial design; tooling.
- Medical, diagnostic, therapeutic, or efficacy claims; emotion classification; burnout prediction.
- Heaters, light therapy, scent delivery, and any thermal actuator.
- Social sharing, leaderboards, and public profiles.
- Accounts, cloud sync, and centralized raw-sensor storage.
- Payments, deposits, pre-orders, inventory, and delivery promises.
- Automated physiological response rules in the first prototype.

Any addition requires a new ADR, an owner, and the relevant review. Inclusion in a design document is not approval.

## Consequences

### Positive

- The team can reach a testable loop without manufacturing risk.
- Local-first data reduces privacy and security scope.
- Exclusions protect against claims the company cannot substantiate.

### Negative / trade-offs

- The prototype will look less impressive than the original six-sense narrative.
- Excluding accounts and cloud limits cross-device history and remote support.
- One dev kit creates vendor dependency, mitigated by an adapter and simulator.

### Risks and mitigations

- **Scope drift back to hardware:** any BOM or tooling spend requires a founder decision recorded against this ADR.
- **Vendor lock-in:** keep the SDK behind one module and test against a simulator.
- **Feature pressure from design partners:** route requests through the backlog and claims matrix rather than ad-hoc inclusion.
- **Haptics safety:** default off; require a separate reviewed decision before enabling.

## Approval and evidence

| Reviewer / approver | Decision | Date | Evidence / comments |
|---|---|---|---|
| Founder / business owner | Pending | | |
| CTO / technical lead | Pending | | |
| Safety or hardware reviewer | Pending | | Required before any haptic or skin-contact work |

## Implementation and verification

- Implementation owner: Founder (interim), then CTO
- Acceptance criteria: an explicit included/excluded list signed by the founder, referenced by the implementation tracker and every phase plan.
- Verification evidence: signed boundary in this ADR; tracker rows updated; website and app copy consistent with the exclusions.
- Backlog tracker row: F0.2 (In progress on approval of this record).

## Revisit triggers

- User evidence supports a different core interaction.
- A dev kit proves unable to deliver usable signals.
- A funded decision to pursue custom hardware.
- Any proposal to add commerce, accounts, cloud storage, or a new sensor modality.
