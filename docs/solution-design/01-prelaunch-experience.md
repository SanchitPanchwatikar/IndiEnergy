# Solution Design 01 — Pre-launch Experience

> **Document control:** Version 0.2 | Status: Proposed; no stack or provider selected | Owner: Product / web lead (TBD) | Last reviewed: 2026-11-20

**Goal:** Learn whether the approved product concept is relevant while offering a truthful, privacy-reviewed waitlist.  
**Related:** [Implementation backlog](../../QWEN_IMPLEMENTATION_TASKS.md), [Enterprise Architecture](../architecture/enterprise-architecture.md)

## 1. Scope

### In scope

- Responsive, accessible public site using only approved product language.
- Clear distinction between concept, prototype, pilot, and availability.
- Optional waitlist with the minimum approved contact information and purpose-specific consent.
- Privacy/terms/support links approved for the launch market.
- Preview environment, basic availability/error monitoring, and rollback instructions.

### Out of scope

- Product checkout, deposits, delivery promises, inventory claims, clinical claims, or testimonials not explicitly substantiated and approved.
- Demo or fake Google authentication, OTP, Stripe/payment forms, and fake SMS.
- Collecting sensor data, mood history, precise location, or unnecessary profile details on the marketing site.

## 2. User journey

```mermaid
sequenceDiagram
  participant U as Visitor
  participant W as Website
  participant S as Waitlist service (only if approved)
  U->>W: Read approved product and availability information
  U->>W: Choose to join waitlist
  W->>U: Explain purpose, fields, retention, and notice
  U->>W: Submit minimum fields and explicit consent
  W->>S: Validate and submit over secure transport
  S-->>W: Accepted or actionable failure
  W-->>U: Honest confirmation or retry guidance
```

If no backend or privacy approval exists, use a founder-approved manual interest-capture process or do not collect entries. Never silently send form data to an unreviewed third party.

## 3. Data and behavior

Proposed minimum record, subject to privacy review:

```text
WaitlistEntry
- id: opaque identifier
- email: required only if approved
- name: optional only if needed
- consent: purpose, notice version, timestamp, and withdrawal status
- created_at: timestamp needed for operation/retention
- status: submitted | withdrawn | deleted
```

`submitted` means durably accepted, not email-verified. `withdrawn` means future contact is stopped while a record is retained only if an approved operational/legal purpose and schedule require it. `deleted` means personal data is erased from active systems, with backup handling documented. Do not use `pending` or `confirmed` unless a separately approved verification flow and its state transitions are implemented.

Do not collect a phone number or require OTP by default. Do not enable marketing messages from waitlist consent alone unless the notice and applicable rules explicitly support it. Avoid storing IP addresses or user-agent strings except for a documented abuse/security purpose with an approved retention rule and named owner.

### Validation and abuse controls

- Validate fields on the client for usability and on the server for enforcement.
- Normalize email consistently; use idempotent submission behavior so retries do not create duplicate entries.
- Apply proportionate rate limits and bot controls approved for the data flow.
- Do not reveal whether a particular email is already registered if that creates an enumeration risk.
- Return clear success, validation, unavailable, and retry states; do not show success when persistence failed.

## 4. Security and privacy

- Use HTTPS and secure provider-side storage if a backend is approved.
- Restrict waitlist export and administration to named roles; log administrative access without logging contact contents.
- Define retention, export/deletion, withdrawal, support, and incident procedures before collecting real entries.
- Assign the F1.7 data-retention owner and schedule before collection; verify deletion behavior for active storage and backups.
- Keep secrets server-side in managed configuration; no privileged key in browser code.
- Use only necessary cookies/analytics, with required notices/consent. Analytics are off until approved.

## 5. Verification

- Unit and end-to-end coverage: required/optional fields, malformed values, consent, duplicates, rate limiting, service failure/retry, and deletion/withdrawal.
- Manual accessibility review against F2.5 criteria: keyboard-only use, focus order, labels/errors, contrast, screen-reader announcements, zoom, cognitive clarity, and small-screen layout.
- Content review: claims match approved matrix; no invented pricing, stock, endorsements, evidence, or launch date.
- Operational check: preview deployment, HTTPS, monitoring, support route, and rollback.

## 6. Release gate

May go live only as a **non-paid, accurately described pre-launch site** after founder approval of copy and qualified review of data collection/notices. If those approvals are unavailable, disable the form rather than collect personal data.
