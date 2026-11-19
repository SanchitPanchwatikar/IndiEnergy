# Solution Design 03 — Wearable Device and Data Boundary

**Status:** Proposed; development device, protocol, sampling, and thresholds TBD  
**Goal:** Evaluate a wrist dev kit safely while keeping device-specific behavior and sensitive data bounded.  
**Related:** [Implementation backlog](../../QWEN_IMPLEMENTATION_TASKS.md), [Companion App design](02-companion-app.md)

## 1. Candidate signals

| Signal | Proposed use | Limitations and controls |
|---|---|---|
| PPG / pulse and derived HRV | Display a qualified measurement/trend | Motion, fit, skin/device variation, and algorithm affect quality; do not diagnose or infer calm |
| EDA / skin conductance | Exploratory physiological signal | Sensitive to context and individual variation; do not label it as a particular emotion |
| Skin temperature | Context and device safety/quality | Not core to diagnosis; measurement can be affected by fit and environment |
| Accelerometer | Motion/activity quality context | Avoid turning motion into unapproved behavior surveillance |
| Haptic actuator | Optional user-selected feedback | Separate safety/comfort evaluation; bounded intensity/duration and immediate off control |

Final signal set depends on evidence, selected device capability, power, comfort, and safety review. No thermal actuator is included in V1.

## 2. Device interface

Define a device-independent adapter with operations conceptually equivalent to:

```text
scan() -> candidate devices
connect(device) -> connection state
subscribe(signal set) -> timestamped measurement events
disconnect() -> confirmed stopped state
set_haptic(pattern, bounded duration) -> result (only if approved)
```

The concrete API must follow the selected SDK/protocol and be approved before implementation. Define explicit states for unavailable, connecting, connected, poor signal, disconnected, and error. The adapter reports raw/derived values and quality metadata; it must not assign psychological meaning.

Provide a simulator that produces deterministic test fixtures, including loss, stale timestamps, out-of-order events, noisy measurements, and reconnects. Simulator values must be visibly marked as simulated and impossible to confuse with user measurements.

## 3. Acquisition and data-quality pipeline

```mermaid
flowchart LR
  Sensor[Selected dev kit] --> Adapter[Vendor/protocol adapter]
  Adapter --> Normalize[Units, timestamps, device/protocol metadata]
  Normalize --> Quality[Quality checks and motion context]
  Quality --> Metric[Validated metric calculation]
  Metric --> App[User-controlled app experience]
  App --> Local[Local/minimized persistence]
  Local -.-> Sync[Optional approved sync; off by default]
```

- Preserve event time and source metadata; do not assume phone receipt time equals sensor time.
- Validate units, plausible ranges, timestamp progression, gaps, and packet integrity using device-specific documentation.
- Apply documented filters/calculations only after device and reference validation; version the algorithm.
- Keep invalid/missing values explicit. Do not interpolate or smooth into a persuasive signal without a documented, validated reason.
- Gate any response on quality and user opt-in; low-quality data produces no automatic response.

## 4. Privacy and storage

- Default to in-memory processing or local, user-controlled storage for the prototype.
- Do not upload continuous sensor streams or link sensor history to waitlist contact details by default.
- If an approved pilot needs data capture, document purpose, fields, consent, encryption, roles, retention, export, deletion, and oversight first.
- Keep diagnostics free of raw readings, direct identifiers, secrets, and free-text health details.
- Define factory reset/device unlinking, app uninstall implications, and deletion verification.

## 5. Hardware safety and feasibility evidence

Before any participant use, document the selected device's materials/skin contact, cleaning, charging, battery protection, firmware, radio, fit, and intended use. Verify haptic output and fail-safe behavior. Assess hazards from misuse and foreseeable use; engage qualified hardware and regulatory reviewers. Do not infer safety or market clearance from a prototype vendor's marketing material.

Bench tests should establish agreed thresholds for accuracy/availability, motion and fit impact, BLE stability, battery/runtime, user comfort, and safe disconnect. Thresholds and test methods are device-specific and must be approved rather than guessed.

## 6. Verification and gate

- Adapter conformance tests against simulator and selected device.
- Reproducible reference/test data for metric calculations, with known limitations and versioning.
- Failure injection for disconnect, low battery, malformed payloads, and app restart.
- Safe haptic stop/timeout tests if that feature is approved.
- Safety, privacy, regulatory, and research approvals before participant data collection.

Production hardware requires a separate design-for-manufacture and certification plan; a development board is not a sellable product.
