# ADR-0010: Public claims and terminology ceiling

> **Document control:** Version 0.1 | Status: Proposed | Decision owner: Founder | Approver(s): Founder and qualified claims/legal reviewer | Date: 2026-11-21

## Related work

- Backlog task IDs: F0.3, F3.1, F5.3, F7.7
- Related solution/enterprise documents: [Claims matrix](../product/claims-matrix.md), [pre-launch experience](../solution-design/01-prelaunch-experience.md), [companion app design](../solution-design/02-companion-app.md)
- Supersedes / superseded by: None

## Context

No claim in the claims matrix is currently **Approved**. Several are marked **Evidence needed**, and two are **Prohibited**. The supplied storefront mock-up contains language and simulated flows that must not ship.

Public copy still has to exist for the website. The choice is between inventing approval informally or writing to a deliberately lower ceiling until evidence and review exist.

**Verified:** the claims matrix defines C-001 to C-006; C-005 and C-006 are prohibited; no claim has a recorded approver or market.

## Decision drivers

- Do not publish a health or performance claim without evidence and review.
- Keep the website useful and credible without overstating the concept.
- Make copy reviewable before deployment, not after.
- Keep terminology consistent across website, app, and support material.

## Options considered

| Option | Benefits | Costs / risks | Evidence or open questions |
|---|---|---|---|
| A. Concept-only factual copy plus explicit non-claims | Defensible without approvals; honest; fast to ship | Less persuasive; requires discipline; some users may find it dry | Consistent with the claims matrix status |
| B. Use benefit language (“supports relaxation”) as the headline | Warmer, more marketable | The exact wording is unapproved and evidence is missing; risks a health-benefit claim in some markets | C-003 is “Evidence needed”, not approved |
| C. Publish nothing until every claim is approved | Maximum caution | Blocks the website and learning; no public surface | Contradicts the phase plan’s website-first intent |

## Decision

**Proposed:** Adopt Option A.

Public copy may contain only:

1. **Factual descriptions of the concept**, written in the present tense about the concept itself and clearly labelled as concept, planned, or in development.
2. **Explicit non-claims** — statements about what the product does not do, does not measure, and does not promise.
3. **Feature descriptions** limited to C-002-type wording (“offers user-controlled guided-breathing sessions”), and only when the feature is actually present or clearly labelled as planned.
4. **Measurement descriptions** limited to “may display pulse and HRV estimates from a compatible device”, always accompanied by a quality caveat and a statement that the value does not establish an emotional or health state.

Public copy must not contain:

- Any suggestion of measuring, transferring, or harmonising “energy” (C-005).
- Any diagnostic, treatment, prediction, or cure language (C-006), including “detects stress”, “predicts burnout”, “reduces anxiety”, or “clinically proven”.
- Testimonials, invented studies, invented endorsements, invented launch dates, invented prices, or simulated authentication, OTP, payment, or stock.
- Efficacy or outcome promises, including “designed to support relaxation” used as a headline benefit until C-003 has evidence and a recorded approver.
- Emotion labels or inferred mood states attributed to a sensor reading.

Every public claim must map to a claims-matrix row, and the mapping is reviewed before deployment. The founder is the business approver; a qualified reviewer approves wording for the launch market. Until then, the site describes only what exists and what is explicitly excluded.

## Consequences

### Positive

- The website can ship without waiting for claim approval.
- Wording is consistent with the governance documents.
- Lower risk of a misleading health claim or a consumer-protection issue.

### Negative / trade-offs

- Copy is more descriptive and less emotionally persuasive.
- Marketing experiments are constrained until evidence exists.
- Requires an explicit review step on every copy change.

### Risks and mitigations

- **Copy drift after launch:** require a claim-to-matrix check in the pull request or deploy checklist.
- **A future hire writes bolder copy:** make this ADR and the matrix part of onboarding.
- **Competitors make stronger claims:** do not match them without evidence; differentiate on honesty and control.

## Approval and evidence

| Reviewer / approver | Decision | Date | Evidence / comments |
|---|---|---|---|
| Founder / business owner | Pending | | |
| Qualified claims / legal reviewer for the launch market | Pending | | Required before any benefit or outcome claim |
| Product copy owner | Pending | | |

## Implementation and verification

- Implementation owner: Founder / product copy owner
- Acceptance criteria: every public sentence either describes the concept factually, states a non-claim, or maps to an approved or proposed claims-matrix row with its status visible in review.
- Verification evidence: a copy audit of the website ([website copy register](../product/website-copy-register.md), 2026-11-21); claims-matrix updates; recorded reviewer sign-off before any benefit claim is added.
- Backlog tracker row: F0.3 (In progress on approval of this record).

## Revisit triggers

- Any new benefit, outcome, or comparative claim.
- New evidence from a pilot or study.
- A new market, language, or advertising channel.
- Regulatory guidance that changes what may be said about wellness devices.
