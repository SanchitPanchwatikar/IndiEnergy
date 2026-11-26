# SDD-01 · Wrist Unit: Hardware and Firmware

> **Repository status:** Imported draft, source `03-solution-design-01-wrist-unit.md` (v0.1 draft, 21 Nov 2026). Not approved. Its parent documents (`00-README.md`, `01-cto-technology-strategy.md`, `02-enterprise-architecture.md`) are not in this repository yet, and the thermal channel (decision D-2) it designs for is currently excluded from V1 by [ADR-0009](../adr/0009-v1-feature-boundary.md). See [the open conflicts](../README.md#open-conflicts-in-the-imported-hew-drafts). Body unedited from the source draft.

**Author role:** Solution architect · **Version:** 0.1 draft · 21 Nov 2026
Parent documents: `01-cto-technology-strategy.md`, `02-enterprise-architecture.md`. Shared assumptions and glossary: `00-README.md`.
Related designs: SDD-02 (phone gateway), SDD-04 (intervention catalogue `I-01…I-08`), SDD-05 (security).

---

## 1. Purpose and scope

The wrist unit senses pulse, skin conductance, skin temperature and motion, and delivers haptic pulses and (if decision D-2 allows) warm/cool pulses. It talks to the phone over BLE only (ADR-001).

**In scope:** electronics, sensing, actuation, safety architecture, firmware, BLE interface, secure update, test and certification approach.
**Out of scope:** the closed-loop policy (SDD-04), phone UX (SDD-02), cloud (SDD-03). Industrial design is covered only where it constrains the electronics.

**Product variants driven by D-2**

| Variant | Channels | Consequence |
|---|---|---|
| **W-Lite** | Haptic + sensing | Longest battery (README §5 case E: about 6.5 days at the assumed loads); simplest safety case |
| **W-Thermal** | Haptic + sensing + warm/cool element | Battery 1–4 days depending on levers (README §5 cases A–D, F); heavier safety case |

The design below covers W-Thermal. Sections marked **[Thermal]** are dropped for W-Lite.

---

## 2. Requirements

### 2.1 Functional

| ID | Requirement |
|---|---|
| SDD01-FR-01 | Measure pulse and inter-beat intervals by PPG, and derive heart rate and HRV features |
| SDD01-FR-02 | Measure electrodermal activity (tonic level and phasic responses) |
| SDD01-FR-03 | Measure skin temperature and a wear/contact state |
| SDD01-FR-04 | Measure motion and classify coarse activity (still, walking, other) |
| SDD01-FR-05 | Emit a feature frame every 30 s with validity flags (design budget ≤ 100 bytes) |
| SDD01-FR-06 | Execute haptic patterns commanded by the phone (I-01, I-02) |
| SDD01-FR-07 | **[Thermal]** Execute warm and cool pulses commanded by the phone (I-03, I-04) |
| SDD01-FR-08 | Run a user-initiated stored breathing pattern with no phone connected (ADR-003 fallback) |
| SDD01-FR-09 | Provide a physical button: start/stop a session, cancel actuation, pairing mode |
| SDD01-FR-10 | Buffer features while disconnected and replay on reconnect (≥ 24 h) |
| SDD01-FR-11 | Research mode: buffer raw PPG, EDA and accelerometer to flash for bulk transfer (consented use only) |
| SDD01-FR-12 | Accept signed firmware updates and roll back on failure |
| SDD01-FR-13 | Report safety events (SE-xx, §6.4) to the phone immediately and persist them |

### 2.2 Non-functional (all values are assumptions to confirm at G1)

| ID | Requirement |
|---|---|
| SDD01-NFR-01 | Zero thermal over-limit events: skin-contact temperature never above the hardware cutoff, under any single fault |
| SDD01-NFR-02 | Sensing + radio average ≤ 3 mW (allocation in §8.1) |
| SDD01-NFR-03 | Heart rate from PPG agrees with chest-strap ECG within a tolerance set by the physiology advisor, at rest and light motion |
| SDD01-NFR-04 | Works across skin tones; validated in the G1 accuracy test and the pilot subgroup analysis (R-12) |
| SDD01-NFR-05 | Skin-contact materials suitable for continuous wear (biocompatibility testing, verify standard) |
| SDD01-NFR-06 | Splash and sweat resistance rating chosen in DVT (verify rating needed) |
| SDD01-NFR-07 | Firmware updates cannot brick the device; update failure reverts to the last good image |
| SDD01-NFR-08 | All limits that bound actuation are enforced on the device regardless of phone commands |

---

## 3. Hardware architecture

```
                         +-------------------------------------------------+
                         |                 WRIST UNIT                      |
   Skin side             |                                                 |
 +-----------+  analog   |  +-----------+      +----------------------+    |
 | PPG optics|---------->|  | PPG AFE   |----->|                      |    |
 | (G + IR)  |           |  +-----------+      |   MCU + BLE SoC      |    |
 +-----------+           |  +-----------+ SPI/ |  (Zephyr, MCUboot)   |    |
 | EDA elec. |---------->|  | EDA AFE   |I2C-->|                      |<-->| BLE to phone
 | (2 dry)   |           |  +-----------+      |  Safety supervisor   |    |
 +-----------+           |  +-----------+      |  Feature extraction  |    |
 | Skin temp |---------->|  | Temp sens.|----->|  Session runner      |    |
 | sensor    |           |  +-----------+      +----+-----------+-----+    |
 +-----------+           |  +-----------+           |           |          |
                         |  |   IMU     |---------->|           |          |
                         |  +-----------+           |           |          |
                         |                    +-----v----+ +----v------+   |
                         |                    | Haptic   | | Thermal   |   |
                         |                    | driver   | | driver    |   |
                         |                    | + LRA    | | [Thermal] |   |
                         |                    +----------+ +----+------+   |
                         |                                      |          |
                         |  INDEPENDENT SAFETY PATH [Thermal]   |          |
                         |  +-------------+   +--------------+  |          |
                         |  | NTC at skin |-->| Comparator + |--+--> cuts  |
                         |  | interface   |   | latch (no FW)|     driver  |
                         |  +-------------+   +--------------+     enable  |
                         |                                                 |
                         |  Battery -> fuel gauge/charger/protection -> PMIC|
                         |  Button, status LED, external flash (buffer)    |
                         +-------------------------------------------------+
```

### 3.1 Component table

Candidate parts are planning examples (see README §7). Verify availability, lifecycle and licensing before choosing.

| Function | Candidate | Notes |
|---|---|---|
| MCU + BLE SoC | Nordic nRF52/53/54L family | Pre-certified module reduces RF certification burden |
| PPG analog front end | ADI MAX86141 or equivalent | Multi-LED, ambient light rejection |
| EDA analog front end | ADI AD5940 or equivalent | Impedance and low-frequency AC measurement |
| Skin temperature | TI TMP117 or equivalent | Skin-facing thermal path needs mechanical design |
| IMU | Bosch BMI270 or ST LSM6DSO | Activity classification, motion artifact reference |
| Haptic driver + actuator | TI DRV2605L + LRA | LRA resonance commonly in the 150–250 Hz range; verify with chosen actuator |
| Thermal element **[Thermal]** | Miniature thermoelectric (Peltier) module or thin-film heater | Cooling needs heat rejection; see §5.2 |
| Safety comparator and latch **[Thermal]** | Discrete analog comparator, reference, latch | No firmware in the path |
| Fuel gauge, charger, protection | Standard Li-polymer chain | Cell and pack certified (§13) |
| External flash | Serial NOR/NAND | Offline buffer, raw research buffer |
| Battery | Li-polymer, 200–300 mAh (cases in README §5) | Size is a D-2 consequence |

### 3.2 Why a separate safety path

A firmware bug, a stuck driver or a misbehaving phone must not be able to overheat skin. The cutoff therefore uses a comparator on a dedicated NTC at the skin interface, a latch, and a hardware enable on the thermal driver. Firmware can observe the latch but cannot clear it while the temperature is above the reset threshold (AP-3, SDD01-NFR-01).

---

## 4. Sensing design

### 4.1 Signals, rates and duty

| Signal | Approach | Rate (assumption) | Notes |
|---|---|---|---|
| PPG | Green LED for pulse at the wrist; IR as motion/contact reference | 50–100 Hz during HRV windows; lower rate for HR-only | HRV from wrist PPG needs adequate sampling; confirm against ECG at G1 |
| EDA | Two dry electrodes, low-frequency AC or DC excitation | 4–10 Hz | Wrist EDA is generally weaker than finger or palm EDA; treat as a risk (§15) |
| Skin temperature | Contact sensor | 0.2–1 Hz | Also used for wear detection |
| IMU | 3-axis accelerometer (gyro optional) | 25–50 Hz | Drives activity gating and motion-artifact rejection |

### 4.2 Feature extraction on the device (ADR-002)

Computed every 30 s and carried in the feature frame. Fields are flagged valid/invalid; invalid is never silently filled.

| Group | Features |
|---|---|
| Pulse | Mean/min/max heart rate; RMSSD and SDNN over the latest valid 60–120 s still window; valid-beat ratio; PPG signal-quality index |
| EDA | Tonic level (SCL); phasic response count and mean amplitude; EDA signal-quality index |
| Temperature | Mean skin temperature; short-term slope |
| Motion | Activity class; step count; motion energy |
| State | Wear/contact state; battery level; intervention state |

HRV is only produced when the user has been still long enough and the signal-quality index passes. When it does not, the frame says so, and the engine (SDD-04) treats the window as "unknown", never as "calm".

### 4.3 Signal quality and gating

- A per-window signal-quality index (SQI) for PPG and EDA, derived from perfusion level, motion correlation and beat-shape consistency.
- Activity gating: HRV windows rejected above a motion-energy threshold.
- Wear detection: combine PPG DC level, skin temperature step and EDA contact impedance. Thermal and haptic actuation require "worn".

### 4.4 Skin-tone and fit robustness

Green-light PPG can be less reliable on darker skin and in cold or sweaty conditions. Mitigations: multi-wavelength LED options, adaptive LED current, a fit check in onboarding (SDD-02), subgroup accuracy testing at G1 and subgroup analysis in the pilot (SDD-06).

---

## 5. Actuation design

### 5.1 Haptics (I-01, I-02)

- LRA driven through a haptic driver with its own waveform library.
- Patterns stored on the device: slow rhythmic taps for breathing cues and for a grounding pattern.
- Amplitude and daily total are limited by the device (§6.2).
- Pattern timing is generated on the device from a pace parameter (e.g. breaths per minute), so a BLE delay does not distort the rhythm.
- Rationale: vibration waves in skin attenuate quickly with distance and frequency, and wrist sites differ from fingertip sites. Amplitude and pattern are therefore tuned on the actual wrist form factor in EVT.

### 5.2 Thermal **[Thermal]** (I-03, I-04)

- Contact element small enough to limit the energy delivered to a defined skin area.
- Warm pulses stay inside the warm-receptor range (about 36–45 °C at the skin). **The design cap is set lower than the top of that range** by the physiology advisor and the applicable touch-temperature standards (verify); the hardware cutoff sits above the design cap and below any injury threshold.
- Cool pulses are limited by the element's heat-rejection path; unlimited cooling pulses are not required.
- Short pulses with enforced rest between pulses. Parameters are bounded on the device (§6.2).
- Thin-film "thermal pixel" approaches and heat-spreading layers are explored in EVT to lower power (levers B, C, F in README §5).
- Contact sensor (NTC) is separate from the skin temperature used for physiology, so the safety path does not share a sensor with the measurement path.

---

## 6. Safety architecture

### 6.1 Layers of protection (AP-3)

| Layer | Mechanism | Independent of firmware? |
|---|---|---|
| L1 Hardware cutoff | NTC → comparator → latch → driver enable **[Thermal]** | **Yes** |
| L2 Battery protection | Cell protection IC, charger limits, fuel gauge | **Yes** |
| L3 Firmware supervisor | Enforces limit table, duty limits, wear requirement; watches temperature; stops actuation on any fault | No |
| L4 Phone policy | Chooses interventions within the approved set | No |
| L5 User control | Button cancels everything; app stop; removing the device ends thermal output via wear detection | Partly |

### 6.2 Device-enforced limit table

The limit table is resident on the device and applies to every command from the phone (SDD01-NFR-08).

| Limit | Meaning |
|---|---|
| Max haptic amplitude and pulse length | Per pattern |
| Max haptic minutes per day | Daily budget |
| Max thermal element temperature **[Thermal]** | Design cap (below hardware cutoff) |
| Max thermal pulse length and minimum rest between pulses | Prevents accumulated heating |
| Max thermal sessions per hour and per day | Rate limits |
| Wear required | No thermal or haptic actuation if not worn (thermal strictly) |
| Lockout after any safety event | Thermal disabled until the user re-enables in the app and the cause is cleared |

**Remote changes may tighten limits, never loosen them.** Loosening requires a signed firmware release (ADR in SDD-05 §8).

### 6.3 Failure modes (summary FMEA)

| Failure | Effect | Detection | Response |
|---|---|---|---|
| Thermal driver stuck on **[Thermal]** | Overheating | NTC → comparator | L1 cuts enable; SE-01; latch |
| Skin-interface NTC fails open/short **[Thermal]** | Safety path blind | Comparator treats open/short as trip; supervisor plausibility check | Cut, SE-02, lockout |
| Firmware hangs during actuation | Output continues | Hardware watchdog; driver time-out timer in hardware | Reset, outputs off at reset, SE-04 |
| Device removed during thermal pulse | Element heats unloaded | Wear detection and NTC | Stop, SE-03 |
| Battery over-temperature or over-charge | Fire risk | Protection IC, charger thermistor | Disconnect, SE-05 |
| Corrupted firmware image | Brick | Signature and hash check at boot | Revert to previous image, SE-06 |
| BLE disconnect mid-session | Orphan session | Link-loss timer | Finish short pattern or stop; features buffer |
| Skin reaction (irritation, contact allergy) | User harm | User report; design review | Materials selection, wear guidance, support process |
| Phone sends out-of-range command | Unsafe parameters | Limit table | Reject, log, do not execute |

### 6.4 Safety event codes

| Code | Event |
|---|---|
| SE-01 | Thermal over-limit trip (hardware latch) |
| SE-02 | Thermal sensor fault |
| SE-03 | Contact lost during thermal output |
| SE-04 | Watchdog reset during actuation |
| SE-05 | Battery fault |
| SE-06 | Firmware update rollback |

Safety events are persisted in non-volatile memory, sent to the phone as indications, and uploaded as incident telemetry (SDD-03). Any SE-01…SE-04 in the field triggers Sev-1 review (01 §9).

---

## 7. Firmware architecture

### 7.1 Modules

```
 +--------------------------------------------------------------+
 | Application layer                                            |
 |  Session runner | Feature extractor | Offline buffer | Config |
 +--------------------------------------------------------------+
 | Services                                                     |
 |  Safety supervisor | Limit table | Event log | Time sync     |
 +--------------------------------------------------------------+
 | Drivers                                                      |
 |  PPG | EDA | Temp | IMU | Haptic | Thermal | Flash | PMIC    |
 +--------------------------------------------------------------+
 | Platform: Zephyr RTOS | BLE stack | MCUboot | Crypto/secure  |
 +--------------------------------------------------------------+
```

### 7.2 Tasks and priorities

| Task | Priority | Notes |
|---|---|---|
| Safety supervisor | Highest | Runs on its own timer; independent of BLE and sensing load |
| Sensor acquisition | High | DMA/FIFO driven; no blocking |
| BLE stack | High | Vendor stack; connection events |
| Session runner | Medium | Generates haptic/thermal timing locally |
| Feature extraction | Medium | Windows every 30 s |
| Offline buffer and flash | Low | Wear-levelled |
| Housekeeping | Low | Battery, logs, time |

### 7.3 Device states

```
 OFF/SHIP --> PROVISIONED --> PAIRED-IDLE --> SENSING --> SESSION (haptic/thermal)
                                  ^              |              |
                                  |              v              v
                                  +------- LOW-POWER <-- SAFETY LOCKOUT

 Any state --> DFU (update) --> reboot into new image or revert
```

### 7.4 Time and ordering

The phone writes time on connect. Every frame carries a monotonic sequence number and a timestamp; the phone corrects drift at sync. Sequence gaps are detected and reported, never silently interpolated.

### 7.5 Device-only fallback (ADR-003)

When no phone is connected, a button press starts a stored breathing pattern (SDD01-FR-08). The device can also give a gentle haptic prompt when its own simple rule detects sustained high arousal; the user must press the button to start a session. Whether this prompt ships is an open item (§16). The full policy engine runs on the phone.

---

## 8. Power design

### 8.1 Allocation (assumption)

Always-on sensing and radio budget of 3.0 mW (README §5):

| Block | Allocation (mW) |
|---|---|
| PPG (LEDs duty-cycled + AFE) | 1.2 |
| EDA | 0.3 |
| Temperature + IMU | 0.3 |
| MCU | 0.6 |
| BLE | 0.6 |
| **Total** | **3.0** |

These values are allocations to design against. Measure in EVT. If PPG exceeds its allocation, reduce duty and sampling before cutting features.

### 8.2 Daily energy and runtime

Assumed loads: haptic 150 mW for 10 min/day; thermal 1 W for 3 min per session; 3.7 V cell; 85% usable capacity (README §5).

| Case | Battery | Thermal use | Total Wh/day | Days per charge |
|---|---|---|---|---|
| A baseline | 200 mAh | 10 sessions at 1.0 W | 0.597 | 1.05 |
| B efficient thermal | 200 mAh | 10 sessions at 0.5 W | 0.347 | 1.81 |
| C fewer sessions | 200 mAh | 5 sessions at 1.0 W | 0.347 | 1.81 |
| D bigger battery | 300 mAh | 10 sessions at 1.0 W | 0.597 | 1.58 |
| E no thermal element | 200 mAh | none | 0.097 | 6.48 |
| F combined levers | 300 mAh | 5 sessions at 0.5 W | 0.222 | 4.25 |

**Reading:** the thermal channel is about 84% of the baseline daily energy (0.500 of 0.597 Wh). Without it, the unit runs more than a week on a small cell. That is the quantitative basis for recommending haptic + audio first (D-2).

### 8.3 Power modes

| Mode | Behaviour |
|---|---|
| Active session | Sensors on, actuation per command |
| Normal wear | Duty-cycled sensing, BLE connection interval relaxed |
| Idle/off-wrist | Sensing stops; wake on motion or button |
| Low battery | Thermal disabled first; haptic budget reduced; feature rate reduced at a lower threshold |
| Ship mode | Ultra-low leakage until first charge |

Charging method (magnetic pogo-pin or wireless) is chosen in DVT.

---

## 9. BLE interface

### 9.1 Security

- LE Secure Connections with out-of-band pairing material (ADR-012); pairing mode opens only by physical button.
- Encrypted link required for every characteristic except standard device information.
- Commands accepted only from the bonded phone.
- Details of threat handling: SDD-05 §5.

### 9.2 GATT profile (v1, contract versioned with the app)

| Characteristic | Access | Content |
|---|---|---|
| Device Information | Read | Model, hardware revision, firmware version, serial hash |
| Feature Frame | Notify | One frame per 30 s, or a replayed frame with sequence number |
| Session Command | Write with response | Start/stop session; intervention id and parameters within the limit table |
| Session Status | Read, notify | Active intervention, elapsed time, reasons for stop |
| Safety Event | Indicate | SE-xx with timestamp |
| Limit Table | Write (signed) | Tightening updates only |
| Buffer Control | Write, notify | Request replay from sequence N; ack |
| Raw Stream | Notify | Research mode only; consented |
| DFU (SMP) | Write | MCUboot image transfer |

### 9.3 Feature frame (design budget ≤ 100 bytes)

| Group | Approx. bytes |
|---|---|
| Header (version, sequence, device short id) | 12 |
| Timestamp | 8 |
| Pulse features (HR mean/min/max, RMSSD, SDNN, valid-beat ratio, SQI) | 20 |
| EDA features | 6 |
| Temperature features | 4 |
| Motion features | 6 |
| Wear/contact and battery | 4 |
| Intervention state | 4 |
| Flags and reserved | 2 |
| Integrity check | 4 |
| **Subtotal** | **70** |

Encoded with Protobuf-compatible field numbering and a compact framing. The 200-byte figure used for cloud sizing in README §5 is a deliberately conservative planning value for the stored record after the phone adds session and metadata fields. A single BLE notification at a typical negotiated MTU can carry the frame (verify at the chosen stack and MTU).

### 9.4 Raw research mode

Raw PPG, EDA and accelerometer samples are buffered to external flash and transferred in bulk when the phone is on charger-like conditions or by user action. Raw mode is off by default and needs separate consent (SDD-02 §7, SDD-05 §6).

---

## 10. Secure boot and update

- MCUboot with signed images (asymmetric signature, algorithm chosen with the security reviewer) and an anti-rollback counter.
- Dual image slots with test-and-confirm: the new image must confirm itself after start-up or the bootloader reverts.
- Image delivered through the phone (SMP over BLE), staged by the OTA service (SDD-03 §8).
- Firmware cannot be updated while a session is active, or below a battery threshold.
- Debug interfaces locked in production; keys provisioned at manufacturing (SDD-05 §4).

---

## 11. Mechanical and materials

- Skin-contact surfaces: materials chosen for continuous wear; irritation and sensitisation testing planned (verify standard and lab).
- EDA electrodes: corrosion-resistant, nickel-free or low-nickel finish; contact area and pressure tuned for stable impedance.
- PPG window: flat, with light shielding to prevent LED-to-sensor crosstalk; strap tension guidance.
- Thermal stack **[Thermal]**: heat spreader, thermal break from the housing, NTC bonded at the skin interface.
- Strap: adjustable, snug fit with a fit-check in onboarding.
- Sealing, sweat and splash resistance: rating selected in DVT.

---

## 12. Verification and test plan

| Level | Tests |
|---|---|
| Unit | Feature extraction against recorded signals; limit-table logic; frame encoding |
| Hardware bench | Thermal ramp and cutoff trip tests; fault injection (driver stuck, NTC open/short); battery protection checks **[Thermal]** |
| Hardware-in-the-loop | Command fuzzing over BLE; out-of-range commands rejected; watchdog behaviour during actuation |
| Signal accuracy | HR and HRV versus chest-strap ECG at rest and light motion; subgroup by skin tone; sweat and cold |
| Power | Measured average power versus §8 allocation; session energy; low-battery behaviour |
| Reliability | Soak tests, drop/vibration, temperature and humidity, strap wear |
| Security | Pairing attack tests, unsigned image rejection, rollback attempts, debug port lock |
| Update | Interrupted update at every stage; power loss during swap |
| Human factors | Comfort over long wear; button usability; skin response review |

Entry to the pilot (G1 → G2) requires the thermal and update tests to pass.

---

## 13. Certification and compliance (indicative; confirm with a compliance partner)

| Area | Indicative standards or regimes | Notes |
|---|---|---|
| Product electrical safety | IEC/EN 62368-1 family | Applicability to confirm |
| Battery | IEC 62133-2 (cell/pack), UN 38.3 (transport) | Needed for shipping |
| EMC | EN 301 489 family, FCC Part 15 | Regional |
| Radio | EN 300 328, FCC Part 15, local approvals (India: WPC; verify) | Pre-certified module helps |
| RF exposure | SAR limits (ICNIRP 2 W/kg per 10 g; FCC 1.6 W/kg per 1 g) | Low-power BLE usually exempt or trivial; confirm |
| Skin contact materials | ISO 10993 family (irritation, sensitisation) | Confirm which parts apply for a wellness device |
| India mandatory registration | BIS and related schemes | **Not researched**; confirm |
| Medical device rules | Not targeted; keep claims to wellness (A-02) | A claims change could trigger a medical pathway |

---

## 14. Manufacturing and supply

- Path: dev kit → design studio → ODM/EMS (01 §5).
- EVT, DVT and PVT builds with test fixtures that include a cutoff-trip test at end of line **[Thermal]**.
- Programming and key provisioning at the factory, with serialisation and per-device pairing material.
- Dual-source critical parts; track lifecycle status of AFEs and the thermal element.
- Cost per unit and minimum order quantities: not researched; obtain quotes.

---

## 15. Risks

| ID | Risk | Mitigation |
|---|---|---|
| R-02 | PPG/EDA quality in daily life | SQI, gating, fit check, G1 accuracy test |
| R-03 | Thermal burn event | §6; hardware cutoff; low duty; field kill switch |
| R-05 | Battery too short with thermal | §8; levers B, C, F; or ship W-Lite |
| R-12 | Sensor bias across skin tones | Multi-wavelength options; subgroup testing |
| R-13 | Wrist EDA signal weak | Validate in G1; make EDA a secondary feature if needed |
| R-14 | Contact irritation | Materials testing; strap and fit guidance |

---

## 16. Open items

- D-2 (thermal or not) decides W-Lite or W-Thermal.
- Thermal design cap and hardware cutoff values: set with the physiology advisor and standards review.
- Whether the device-only arousal prompt (§7.5) ships.
- Charging method and ingress rating.
- Final part selection, cost and lead times.
