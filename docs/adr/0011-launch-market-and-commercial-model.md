# ADR-0011: Launch market and commercial model

> **Document control:** Version 0.1 | Status: Proposed | Decision owner: Founder | Approver(s): Founder, with qualified legal/regulatory review | Date: 2026-11-21

## Related work

- Backlog task IDs: F0.4, F1.4, F1.7, F7.3, F7.7
- Related solution/enterprise documents: [CTO strategy](../strategy/cto-strategy.md), [pre-launch experience](../solution-design/01-prelaunch-experience.md), [production operations](../solution-design/04-production-operations.md), [claims matrix](../product/claims-matrix.md)
- Supersedes / superseded by: None

## Context

The concept is assumed to launch in India, in English, as a non-paid waitlist followed by a free prototype. That assumption has not been reviewed for device classification, advertising, privacy, consumer, payment, tax, import, or radio requirements.

Taking money now would create obligations the company cannot yet meet: no product, no stock, no fulfilment owner, no support process, and no reviewed terms.

## Decision drivers

- Learn interest without creating consumer, payment, or delivery obligations.
- Avoid implying that a finished device is available.
- Keep the option to change market or model after review.
- Collect no personal data until a retention owner and notice exist (F1.7).

## Options considered

| Option | Benefits | Costs / risks | Evidence or open questions |
|---|---|---|---|
| A. India-first, English, free waitlist, no payments | Low legal and operational surface; fast to launch; consistent with prototype stage | Limits reach; no revenue signal; India-specific requirements unverified | Market assumption only; no counsel review yet |
| B. Global English waitlist | Larger audience; simple to operate | Multiple jurisdictions, privacy regimes, and advertising rules at once | Not supportable before any review |
| C. Paid pre-order or deposit | Validates willingness to pay; cash | Consumer-law, refund, tax, and fulfilment exposure with no product; likely misleading | Rejected for V1 |

## Decision

**Proposed:** Adopt Option A.

- **Market:** India first, English language. Treated as a working assumption pending written review under F1.4.
- **Commercial model:** a free, non-paid waitlist. No payment, deposit, pre-order, price, or delivery date is offered.
- **Currency and pricing:** not set. When pricing research begins, it is in INR with tax and import treatment reviewed first.
- **Support and fulfilment:** unassigned. No product can be sold until a named owner exists.
- **Compliance:** no claim of regulatory approval, certification, or legal compliance is made on the website or in marketing.
- **Data:** no waitlist collection until F1.7 assigns a retention owner and schedule, and a privacy notice and deletion path are reviewed.

Any move to paid commerce requires a new ADR and founder approval after F6.3 unit-economics work and F7.3 readiness.

## Consequences

### Positive

- Removes payment, refund, and fulfilment risk from the learning phase.
- Keeps the website honest and quick to deploy.
- Preserves flexibility on market entry.

### Negative / trade-offs

- Signups measure interest, not willingness to pay.
- An India-only list may under-represent demand elsewhere.
- Future market expansion will need separate review and possibly separate notices.

### Risks and mitigations

- **Signups treated as product-market fit:** state in reporting that a waitlist is an interest signal only.
- **Regulatory assumptions treated as facts:** label India as an assumption everywhere; obtain written review before sale.
- **Pressure to add a “reserve” button:** reject until inventory, price, terms, and fulfilment are real and approved.
- **Data collection creep:** no form until the retention schedule and notice are approved.

## Approval and evidence

| Reviewer / approver | Decision | Date | Evidence / comments |
|---|---|---|---|
| Founder / business owner | Pending | | |
| Qualified India regulatory / legal reviewer | Pending | | Required before public claims, data collection, or sale |
| Privacy owner | Pending | | Required before waitlist collection |

## Implementation and verification

- Implementation owner: Founder (interim)
- Acceptance criteria: the website states the non-paid, concept-only model; no payment or pre-order path exists; the market assumption is labelled as unverified.
- Verification evidence: written review checklist under F1.4; site copy audit; waitlist launch blocked until F1.7 evidence exists.
- Backlog tracker row: F0.4 (In progress on approval of this record).

## Revisit triggers

- Qualified review changes the market or requirements.
- A decision to accept payment or pre-orders.
- A new country, language, or currency.
- Any proposal to sell, ship, or import hardware.
