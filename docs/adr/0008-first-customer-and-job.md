# ADR-0008: First customer and job to be done

> **Document control:** Version 0.1 | Status: Proposed | Decision owner: Founder | Approver(s): Founder, with product/research input | Date: 2026-11-21

## Related work

- Backlog task IDs: F0.1, F1.1, F1.6
- Related solution/enterprise documents: [CTO strategy](../strategy/cto-strategy.md), [enterprise architecture](../architecture/enterprise-architecture.md), [ADR-0001](README.md) (umbrella question, split for review)
- Supersedes / superseded by: None. This record splits part of the planned ADR-0001 question into a reviewable decision.

## Context

The repository defines a wellness concept built around a wrist-worn sensor, a companion app, and a breathing practice. It contains no approved target customer and no user research. Every downstream decision — copy, device form factor, price, pilot recruitment — depends on knowing who the first user is.

**Verified:** the repository holds design and governance documents only, plus a storefront mock-up that is not an approved claims source.

**Assumption:** the first market is India and the first language is English. This is a working assumption, not a legal conclusion.

A segment is only useful if it is narrow enough to interview and specific enough to exclude people. “Anyone who feels stressed” is not a segment.

## Decision drivers

- Must be reachable for 8–12 interviews within four weeks without a recruitment vendor.
- Must plausibly own or wear a wrist device already, so the concept is not asking for a new behaviour.
- Must have a recurring, short, identifiable moment where a breathing practice is plausible.
- Must not require a medical claim or a clinical population to be interesting.
- Must tolerate a concept-stage website and a prototype app with no purchase option.

## Options considered

| Option | Benefits | Costs / risks | Evidence or open questions |
|---|---|---|---|
| A. Working professionals aged 25–40 in metros, already using breathing/meditation apps or a smartwatch | Already pays attention to recovery; owns wearables; reachable through professional networks; clear short stress moments | Price sensitivity; crowded category; may expect clinical-grade data | No interviews yet; assumption that this group wants a physical intervention rather than another app |
| B. Students aged 18–24 around exams | High reported stress; strong word of mouth; low device ownership may be a barrier | Minors/guardianship boundary near 18; seasonal demand; lower willingness to pay | No interviews; device ownership unknown |
| C. Broad “anyone who feels stressed” | Large apparent market; easy to write generic copy | Impossible to interview or design for; invites unsupported claims; no testable differentiation | Rejected as a working segment |

## Decision

**Proposed:** Adopt Option A as the first customer for discovery and prototype work.

Target user: a working professional aged 25–40 in an Indian metro, who already uses a breathing or meditation app or wears a smartwatch, and who wants a short, physical way to downshift during a stressful moment.

Job to be done: *“When a stressful moment hits and I have about three minutes, I want something physical I can do without opening another screen, so I can return to what I was doing.”*

Non-goals for this decision: clinical populations, crisis support, sleep medicine, athletic performance, children and minors, and enterprise wellness programmes.

This ADR remains **Proposed** until the founder records approval and the interview evidence below exists. It does not authorize recruitment, data collection, or spend.

## Consequences

### Positive

- Copy, recruitment, and prototype scope can be specific.
- The device form factor can be evaluated against a discreet, everyday wrist-worn use case.
- Exclusions become defensible, which reduces the risk of drifting into medical claims.

### Negative / trade-offs

- Excludes students and broader “wellness” audiences from the first release.
- Assumes wearable familiarity that may not hold outside metro professional networks.
- A narrow segment may look like a small market to early supporters.

### Risks and mitigations

- **Segment does not actually own wearables:** screen for device ownership during recruitment and record the proportion.
- **The moment is not real or not recurring:** ask for a recent, specific example before describing the concept.
- **Price sensitivity:** do not price in this phase; test willingness-to-try, not willingness-to-pay.
- **Founder bias:** separate observations from assumptions in the findings memo and include disconfirming cases.

## Approval and evidence

| Reviewer / approver | Decision | Date | Evidence / comments |
|---|---|---|---|
| Founder / business owner | Pending | | |
| Product / research lead | Pending | | |
| Privacy or legal reviewer | N/A at this stage — no data collection approved | | Revisit before any interview recording or health-data capture |

## Implementation and verification

- Implementation owner: Founder (interim)
- Acceptance criteria: a one-page brief naming the target user, the job to be done, non-goals, and the top three assumptions to test.
- Verification evidence: 8–12 founder-approved interviews; findings memo separating observation from assumption; documented changes to this ADR.
- Backlog tracker row: F0.1 (In progress on approval of this record).

## Revisit triggers

- Interview evidence contradicts the segment or the moment.
- A materially different segment shows stronger repeat-use intent.
- The first market changes.
- Any proposal to include minors, clinical populations, or health-data collection.
