# Solution Design 02 — Companion App

**Status:** Proposed logical design; platforms and framework TBD  
**Goal:** A user-controlled wellness experience that remains useful without making a diagnosis or requiring cloud processing.  
**Related:** [Implementation backlog](../../QWEN_IMPLEMENTATION_TASKS.md), [Enterprise Architecture](../architecture/enterprise-architecture.md)

## 1. Product boundary

V1 candidate: onboarding and privacy explanation; optional connection to the selected wrist development device; signal-quality-aware pulse/HRV and other approved measurements; breathing guidance; optional user check-ins; history and deletion controls; optional haptics only after safety review.

No diagnosis, emotion classification, treatment recommendation, crisis monitoring, automated medical escalation, social sharing, thermal stimulation, or efficacy promise. The user can use guided breathing without granting sensor permission.

## 2. Logical components

```text
Presentation
  onboarding | permissions | connection | session | history | settings/data controls
Application
  session orchestration | user-approved rules | check-in workflow
Domain
  typed measurements | quality states | session/check-in models | consent state
Infrastructure
  device adapter | local store | optional approved sync adapter | privacy-safe diagnostics
```

Keep UI, device SDK, metric computation, and persistence behind interfaces. Include a deterministic simulator for development and tests. Do not couple product behavior directly to a specific vendor SDK.

## 3. User-controlled session flow

1. User chooses a session and may skip sensor connection.
2. App clearly indicates permission and device state; no hidden/background collection.
3. Adapter emits timestamped values with source, units, protocol version, and quality.
4. Metric layer emits a value only when input quality and calculation requirements are met.
5. UI distinguishes measured values, estimates, user check-ins, and unavailable data.
6. Guidance begins only by explicit user action; the user may pause, stop, or disable output at any time.
7. App records only approved session metadata and user-entered data, with retention/deletion behavior visible.

Do not interpret a single elevated heart rate or HRV value as stress or calm. Activity, fit, individual differences, and device quality can affect measurements.

## 4. Data contracts

Conceptual value (not a committed language schema):

```text
Measurement {
  kind, value, unit, observed_at,
  source_device, protocol_version,
  quality: good | limited | unavailable,
  quality_reasons[]
}
```

Do not persist raw sample streams by default. If a later feature requires them, require a new purpose and privacy/security review, explicit consent, retention limit, access design, and deletion test. Keep self-reported check-ins in a separate model from device measurements.

## 5. Failure and safety behavior

- Permission denied: preserve a sensor-free session path.
- Device absent/disconnected: show the state; never substitute fabricated values.
- Poor contact/motion/noisy sample: mark limited/unavailable; do not trigger a response rule.
- App backgrounded or output connection lost: stop or safely time out haptics; do not auto-resume without user action.
- Local storage full/corrupt: surface the error and explain data recovery/deletion implications; do not claim a save succeeded.
- User concern or worsening mood: provide approved, non-diagnostic help language; do not present the app as crisis support.

## 6. Quality and testing

- Unit tests for calculation boundaries, timestamps, quality gating, rule determinism, consent transitions, and deletion.
- Adapter contract tests with simulator cases for missing, stale, malformed, out-of-order, and disconnected data.
- Device tests on the selected hardware for fit, activity, BLE reconnect, battery impact, and supported OS versions.
- Accessibility and usability testing for stopping sessions, understanding metrics, permission refusal, and opting out.
- Validate calculations against documented device capabilities and independent reference procedures before displaying them as meaningful.

## 7. Release gate

Do not collect pilot data until sensor quality criteria, privacy notices/consent, retention/deletion, device safety review, and any required study oversight are approved. Cloud accounts and sync remain out of scope unless the founder approves a user need and a separate data design.
