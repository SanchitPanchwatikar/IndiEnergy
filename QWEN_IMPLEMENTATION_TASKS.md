# AuraSync: Qwen implementation backlog

> **Document control:** Version 0.2 | Status: Working backlog — product and architecture decisions pending | Owner: Founder / delivery lead (TBD) | Last reviewed: 2026-11-20

Founder-oriented, phase-gated task list from concept validation to production. Phase gates are strict: do not start a later phase until the preceding gate is approved. Within the active phase, work one task at a time in ID order; stop and record a blocker rather than skipping to a later phase. The founder may explicitly authorize an independent task by recording the exception and rationale in the [implementation tracker](docs/delivery/implementation-tracker.md).

Use the [implementation tracker](docs/delivery/implementation-tracker.md) as the authoritative source for task status, owners, evidence, blockers, and design/approval traceability. This file's checkboxes are a visual checklist only.

## Product direction and non-negotiable assumptions

- **MVP:** a wellness companion built around a phone app and a wrist-worn development device. Start with validated pulse/HRV, skin conductance, skin temperature, and motion inputs; guided breathing, optional haptic feedback, and voluntary calm check-ins. Final sensors and hardware are subject to feasibility testing.
- **Positioning:** general wellness and self-awareness. Do not claim to measure "human energy," diagnose stress/anxiety/depression, predict burnout, or treat a condition. Do not imply that HRV proves a person is calm or that the product is clinically effective.
- **V1 excludes:** custom mass-production hardware, medical/therapeutic claims, brain stimulation, light-therapy glasses, scent delivery, thermal actuators, social sharing, and unvalidated automatic emotion classification.
- **Commercial launch:** a waitlist may launch before a finished device. Do not take deposits or product orders, promise delivery dates, or present simulated Google login, OTP, Stripe, inventory, or fulfillment as real.
- **Launch market:** India is a working assumption, not a legal conclusion. India-specific device, advertising, privacy, consumer, payments, tax, import, and manufacturing requirements have not been verified. Obtain qualified review for the actual launch markets.
- **Evidence:** the supplied concept and single-file storefront are research/mock-up inputs, not validated specifications. The mock-up's hardcoded OTP (`1234`) and simulated payment/authentication must never ship as real flows.

## How Qwen should execute

1. Complete one task at a time in ID order. Keep each change small, tested, and reviewable; report the task ID, changed files, commands/results, open risks, and next task.
2. Before coding, inspect the repository, current branch/worktree, manifests, tests, and existing conventions. Do not overwrite or discard user changes. If this repository is still empty, propose the smallest suitable stack and ask the founder to approve it before scaffolding.
3. Use the repository's existing stack and patterns where possible. Do not add dependencies, services, cloud resources, real credentials, production data, or paid services without approval.
4. Do not silently decide product, safety, legal, privacy, sensor, payment, or deployment behavior. Stop at the relevant approval gate and present the decision needed.
5. Add focused tests for new behavior and run the narrowest relevant checks. Never mark a task done based only on code generation; include test evidence and acceptance criteria.
6. Keep secrets out of source, logs, screenshots, and reports. Use documented local placeholders and managed secret storage in deployment.
7. Do not proceed past a phase gate on a favorable code review alone. Gates requiring founder, user-research, clinical, legal, hardware-safety, or regulatory approval need that named approval.
8. Update the implementation tracker when a task starts, blocks, is deferred, or meets its acceptance criteria. Link verifiable evidence; do not mark a task done based only on a code change.
9. Record consequential choices in the [ADR log](docs/adr/README.md), and check the [claims matrix](docs/product/claims-matrix.md) before changing any user-facing product wording.
10. Use the [safety-event runbook](docs/operations/safety-event-runbook.md) for pilot/production safety reports. It must be completed with named owners and local escalation paths before user exposure.

## Phase 0 — Founder decisions and product scope

- [ ] **F0.1 Choose the first customer and use case.** Define one target segment, the moment/problem the product addresses, exclusions, accessibility needs, and how the product fits into a user's day.
  - **Done when:** a one-page brief names the target user, job to be done, non-goals, and the top three assumptions to test.
- [ ] **F0.2 Approve the V1 feature boundary.** Confirm the MVP and exclusions above; decide whether the first release is only a waitlist/learning site or also includes a companion app and development-device pilot.
  - **Done when:** founder signs off on an explicit included/excluded feature list.
- [ ] **F0.3 Approve claims and terminology.** Review every public product name, headline, metric label, and benefit claim; avoid unsupported "bio-energy," diagnostic, efficacy, and treatment language.
  - **Done when:** a claims matrix lists approved wording, prohibited wording, and who approves future copy.
- [ ] **F0.4 Decide the first launch geography and commercial model.** Confirm India-first or another market, waitlist versus sale, pricing research plan, and whether any payment is intended.
  - **Done when:** target market, currency, customer support/fulfillment owner, and payment decision are documented. If undecided, launch a non-paid waitlist only.

**Phase gate 0:** No product build or public marketing beyond an explicitly approved prototype until F0.1–F0.4 are approved.

## Phase 1 — Customer, technical, safety, and compliance validation

- [ ] **F1.1 Test the problem before building the full product.** Conduct founder-approved interviews/usability sessions with the target segment. Do not collect health details unless the protocol, consent, storage, and access are approved.
  - **Done when:** findings record what users need, current alternatives, objections, willingness-to-try signals, and changes to the product brief; distinguish observations from assumptions.
- [ ] **F1.2 Verify sensor and device feasibility.** Compare suitable development kits and vendors for pulse/HRV, EDA, skin temperature, motion, Bluetooth, SDK access, fit, power, cost, and data quality during normal activity.
  - **Done when:** a selected dev-kit proposal and bench-test protocol include limitations, expected sampling/data handling, and explicit go/no-go thresholds approved by the founder.
- [ ] **F1.3 Define safety and foreseeable misuse.** Assess skin contact, irritation, cleaning, charging, battery/thermal hazards, haptic exposure, use while driving/sleeping, and guidance for concerning symptoms. Do not add a heater in V1 without a separate safety case.
  - **Done when:** a reviewed hazard log maps each risk to a mitigation, owner, verification evidence, and residual-risk acceptance.
- [ ] **F1.4 Obtain market-specific regulatory, privacy, and consumer review.** Ask qualified counsel/experts to assess product classification, wellness claims, personal-data handling, consent/retention/deletion, minors, terms/privacy notices, e-commerce, payment, tax, import, and radio requirements for the chosen market.
  - **Done when:** a written checklist identifies applicable requirements, required filings/tests, responsible owner, and pre-launch blockers. Do not infer approval from this backlog.
- [ ] **F1.5 Define study and outcome plan.** If evaluating effects, specify a founder/qualified-reviewer-approved protocol with appropriate comparison/sham, recruitment, consent, adverse-event handling, endpoints, analysis, and publication/claims boundaries.
  - **Done when:** a protocol is reviewed and required ethics/oversight approvals are obtained before recruitment or data collection. Otherwise mark efficacy as unproven and do not claim it.
- [ ] **F1.6 Validate competitors and alternatives.** Compare current products, substitutes, target segments, feature/channel, pricing, evidence quality, availability, and material limitations. Date-stamp sources and separate verified facts from vendor claims and assumptions.
  - **Done when:** a founder-reviewed comparison identifies the most relevant alternatives and a testable differentiation hypothesis; no stale price, efficacy, or regulatory statement is presented as current fact.
- [ ] **F1.7 Assign a data-retention owner and schedule.** Define retention/deletion rules by data category, purpose, active system, backup, and legal/operational hold; assign an accountable owner and qualified reviewer.
  - **Done when:** the schedule names owner, trigger, duration or deletion rule, and evidence for each approved category. No real waitlist, sensor, check-in, or pilot data is collected until its schedule and notice are approved.

**Phase gate 1:** Founder accepts the problem evidence, device feasibility, hazard plan, and compliance path. Any unresolved safety or legal blocker keeps the product out of user testing or sale.

## Phase 2 — Repository baseline and approved technical design

- [ ] **F2.1 Inventory the workspace and mock-up.** Record the actual app entry points, stack, build/test commands, deployment setup, and dirty files. Treat the supplied HTML as a visual prototype; identify its demo-only authentication, OTP, payment, cart, and product claims.
  - **Done when:** a concise baseline report and prioritized keep/replace list are attached to the task/PR; no user changes are overwritten.
- [ ] **F2.2 Propose the minimum architecture.** Based on the approved scope and repository, propose client(s), API/data needs, identity, hosting, observability, and environment strategy. Prefer the least complex option that meets the agreed requirements.
  - **Done when:** founder approves an architecture decision record with data-flow diagram, boundaries, costs/operational owners, and rejected alternatives. Do not scaffold before approval if the repo is empty or the stack is undecided.
- [ ] **F2.3 Define privacy and security requirements.** Document data inventory/classification, consent and withdrawal, minimum collection, retention/deletion, access, encryption, threat model, abuse cases, and incident ownership.
  - **Done when:** requirements and threat model are approved and trace to testable acceptance criteria. Default to local/minimized data until a backend is justified.
- [ ] **F2.4 Establish engineering checks.** Configure only approved project tooling for formatting/linting, type/build checks, unit tests, dependency scanning, secret detection, and CI. Add a safe local development setup and sample environment file without secrets.
  - **Done when:** a clean checkout can run the documented checks and CI blocks merges on required failures.
- [ ] **F2.5 Set accessibility requirements and verification.** Define the supported platforms, accessibility standards/criteria, assistive-technology coverage, and user testing needed for the site and companion experience.
  - **Done when:** the criteria are approved and trace to onboarding, forms, measurement display, session controls, error states, and stop/opt-out interactions.

**Phase gate 2:** Approved architecture, data boundaries, threat model, and repeatable CI exist before feature implementation.

## Phase 3 — Safe public pre-launch site

- [ ] **F3.1 Rework the storefront around the validated V1.** Align page content and product catalog with the approved MVP. Remove unapproved modules, unsupported outcomes, fabricated evidence, fake endorsements, and unverified pricing.
  - **Done when:** every public claim maps to the approved claims matrix; the page distinguishes concept/prototype from available product.
- [ ] **F3.2 Implement an honest waitlist flow.** Collect only approved minimum fields, disclose purpose and retention, obtain consent, validate inputs, provide accessible success/error states, and prevent duplicate or abusive submissions.
  - **Done when:** end-to-end tests cover valid submission, invalid input, consent, duplicate handling, failure/retry, and deletion/withdrawal path; no fake OTP or payment step remains.
- [ ] **F3.3 Add operational basics for the public site.** Provide support/contact route, privacy and terms links reviewed for the market, accessible responsive UI, analytics only if approved, and clear prototype/product availability language.
  - **Done when:** keyboard/mobile/accessibility checks pass, links and forms work, and no secret or personal information appears in client code or logs.
- [ ] **F3.4 Deploy a preview environment.** Use approved hosting and non-production configuration; set domain, HTTPS, error reporting, and rollback instructions.
  - **Done when:** founder can review the preview on supported devices and approve copy, UX, privacy notices, and monitoring before public launch.

**Phase gate 3:** The site may launch as an approved non-paid waitlist only. It must not imply that a finished device is for sale.

## Phase 4 — Companion app and sensor-data foundation

- [ ] **F4.1 Build the app shell and onboarding.** Implement the approved platform(s), permissions, clear sensor connection state, privacy explanation, and an accessible path to skip or withdraw.
  - **Done when:** first-run, permission-denied, offline, reconnect, and account/data choices are tested on supported devices.
- [ ] **F4.2 Implement sensor acquisition behind a typed device interface.** Integrate only the selected dev kit/SDK; separate raw acquisition from device-independent app logic and provide a simulator for automated tests.
  - **Done when:** unit/integration tests cover malformed, missing, stale, noisy, and disconnected readings; raw sensor data is never labeled as a psychological diagnosis.
- [ ] **F4.3 Implement signal-quality and metric handling.** Document and validate pulse/HRV computation against the chosen device's capabilities; detect motion/poor-contact conditions and suppress or qualify unreliable estimates.
  - **Done when:** reference datasets/test vectors and device tests establish agreed error/quality thresholds; UI communicates unavailable/low-confidence data instead of inventing a value.
- [ ] **F4.4 Implement consent-based check-ins and history.** Make self-reported calm optional, explain why it is requested, allow editing/deletion, and separate self-report from sensor measurements.
  - **Done when:** the data model, export/delete path, retention behavior, and consent withdrawal are tested end to end.
- [ ] **F4.5 Decide whether accounts and cloud sync are necessary.** Prefer no account/cloud collection for the prototype unless an approved user need requires it.
  - **Done when:** founder approves the data architecture; if cloud is needed, authorization, tenant/user isolation, backups, retention, deletion, and access audit are tested.

**Phase gate 4:** Sensor data quality, consent, deletion, and failure states meet approved criteria before any pilot user data is collected.

## Phase 5 — Closed-loop experience and controlled prototype

- [ ] **F5.1 Implement user-controlled guidance.** Add paced-breathing or other approved wellness sessions with clear start/stop, accessibility controls, and no coercive notifications.
  - **Done when:** sessions are usable without sensor access and can be stopped immediately; safety/help text does not position the app as crisis support.
- [ ] **F5.2 Add optional haptics only if the selected device supports it safely.** Make intensity, schedule, and disable controls explicit; do not make automated physiological responses the default.
  - **Done when:** hardware tests verify controllable output, timeouts, disconnect-safe behavior, and a user-accessible off switch.
- [ ] **F5.3 Add explainable response rules.** Use simple, founder-approved thresholds/rules only when signal quality is sufficient and the user opts in. Do not train or deploy emotion inference without a separate approved data/evaluation plan.
  - **Done when:** rule behavior is deterministic, documented, tested for boundary cases, and explains that it is a wellness prompt rather than a diagnosis.
- [ ] **F5.4 Run internal bench and usability testing.** Test fit, comfort, signal quality, battery, BLE reliability, setup, instructions, cleaning, and failure recovery with the approved protocol.
  - **Done when:** results meet Phase 1 thresholds or issues are documented with owners and retest criteria; no unresolved high-severity hazard remains.
- [ ] **F5.5 Prepare pilot release.** Add versioning, consent capture, support/incident route, event logging minimized to approved data, and an opt-in/opt-out flow.
  - **Done when:** pilot build is reproducible and the pilot owner, protocol/oversight, participant support, and data access are approved.

**Phase gate 5:** No participant pilot begins until the protocol and any required oversight are approved, device risks are accepted, and consent/data processes are verified.

## Phase 6 — Pilot, learn, and decide whether to build the product

- [ ] **F6.1 Conduct the approved small pilot.** Follow the protocol exactly; track usability, adherence, safety events, and pre-approved outcomes. Do not quietly change endpoints or promote exploratory results as proof.
  - **Done when:** data collection closes per protocol, adverse events are reviewed, and data is securely handled or deleted according to the approved plan.
- [ ] **F6.2 Analyze and document results.** Report missingness, uncertainty, limitations, and negative as well as positive findings. Separate descriptive product feedback from evidence of efficacy.
  - **Done when:** founder and qualified reviewer approve a results memo and a go/no-go decision on feature, claims, target user, and next study.
- [ ] **F6.3 Revisit unit economics and manufacturing.** Obtain supplier quotes, bill of materials, yield/quality assumptions, warranty/returns/support costs, shipping, taxes, and realistic price research.
  - **Done when:** founder approves the target price/margin and a manufacturing/fulfillment plan; no product checkout opens without credible inventory and delivery assumptions.
- [ ] **F6.4 Freeze hardware requirements for a production candidate.** Finalize industrial design, component lifecycle, firmware update/recovery, battery, charging, enclosure, cleaning, skin-contact materials, and repair/disposal plan.
  - **Done when:** design inputs and verification plan are approved by hardware, safety, and manufacturing owners.

**Phase gate 6:** Founder makes an explicit continue/pivot/stop decision. A small pilot is not proof of clinical benefit or regulatory clearance.

## Phase 7 — Production engineering and release readiness

- [ ] **F7.1 Harden the production application and APIs.** Add production-grade authorization, input validation, rate limits, privacy-safe logs, error handling, backups, and migrations only for approved features/data.
  - **Done when:** threat-model cases and failure recovery tests pass; access is least-privilege; no sensitive data is exposed in logs or analytics.
- [ ] **F7.2 Replace every prototype integration.** Remove mock Google sign-in, hardcoded OTP, fake Stripe/checkout, test payment data, in-memory-only order promises, and simulated inventory from production paths.
  - **Done when:** each retained integration uses the approved provider's supported production flow and sandbox-tested webhooks/idempotency; otherwise the feature is absent/disabled.
- [ ] **F7.3 Add real commerce only after founder approval.** Confirm product availability, price/tax/shipping/returns/warranty, customer support, privacy/terms, payment provider, fraud/refund handling, and fulfillment ownership first.
  - **Done when:** test orders reconcile from checkout through webhook, cancellation/refund, notifications, and fulfillment without double-charging; a live transaction is separately approved.
- [ ] **F7.4 Complete device verification and required certifications.** Execute electrical/battery, RF/Bluetooth, skin-contact, thermal (if applicable), drop/water ingress (if claimed), EMC, and market-specific certification tests as applicable.
  - **Done when:** reports and required approvals are in hand; all safety-critical defects are closed or formally blocked from release.
- [ ] **F7.5 Run product quality checks.** Test supported OS/browser/device matrix, accessibility, localization, performance, data export/deletion, backup/restore, upgrade/rollback, and production-scale load assumptions.
  - **Done when:** release criteria are met and known issues are explicitly accepted by the founder; no unresolved critical/high security or safety defect remains.
- [ ] **F7.6 Establish production operations.** Set up approved environments, managed secrets, least-privilege access, monitoring/alerts, uptime and support ownership, incident response, backups, restore drills, release/rollback runbooks, and dependency patch process.
  - **Done when:** an operator other than the implementer can deploy, diagnose, restore, and roll back using the runbooks; alerts are tested without real user data; named safety-event owners and local escalation paths are in place and the [safety-event runbook](docs/operations/safety-event-runbook.md) is exercised.
- [ ] **F7.7 Complete final legal and claims review.** Verify required privacy/consumer notices, terms, consent, product labels/instructions, advertising, tax/payment details, registrations, and required regulatory clearances for actual markets.
  - **Done when:** named qualified reviewers and founder record approval; missing items are explicit release blockers.

**Phase gate 7:** Production launch is blocked until safety, legal/regulatory, privacy/security, operational, inventory/fulfillment (if selling), and founder approvals are recorded.

## Phase 8 — Staged production launch

- [ ] **F8.1 Run a production-readiness review.** Review release candidate, test evidence, open defects, capacity/cost, access, monitoring, support scripts, incident contacts, privacy/data deletion, rollback, and go/no-go checklist.
  - **Done when:** each release owner signs off and a rollback has been rehearsed.
- [ ] **F8.2 Launch to a small, approved cohort.** Use feature flags and explicit cohort limits; monitor crashes, sensor/device failures, support contacts, safety reports, and privacy/security alerts.
  - **Done when:** the agreed observation period completes with metrics inside approved thresholds and no unresolved release-blocking incident.
- [ ] **F8.3 Expand availability deliberately.** Increase cohort or sales only after reviewing staged-launch evidence and support/manufacturing capacity.
  - **Done when:** founder approves each expansion; customer communications and fulfillment remain accurate.
- [ ] **F8.4 Operate and improve.** Review reliability, feedback, returns, safety events, retention, data requests, and costs on a defined cadence. Revalidate claims and privacy when features or markets change.
  - **Done when:** owners and review cadence are in place, incidents have follow-up actions, and the roadmap reflects evidence rather than assumptions.

## Definition of production live

The product is **not** considered live merely because a URL or build exists. Mark production live only when:

- The founder's approved release checklist and all applicable Phase 7 gates are signed.
- The production domain/app is reachable over secure transport with monitoring, alerting, support, and rollback verified.
- The released functionality matches the approved scope and claims; demo/test flows and credentials are absent.
- Privacy, consent, deletion, security, and incident processes work as released.
- If orders are enabled, real stock, accurate pricing/terms, tested payment/refund/fulfillment, and customer support are operational.
- A named owner is monitoring the staged launch and can pause rollout.
