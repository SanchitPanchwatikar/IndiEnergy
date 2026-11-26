# SDD-04 · Closed-Loop Engine (sense → infer → respond)

> **Repository status:** Imported draft, source `03-solution-design-04-closed-loop-engine.md` (v0.1 draft, 21 Nov 2026). Not approved. Its parent documents (`00-README.md`, `01-cto-technology-strategy.md`, `02-enterprise-architecture.md`) are not in this repository yet; its thermal interventions (I-03, I-04) are currently outside the V1 boundary in [ADR-0009](../adr/0009-v1-feature-boundary.md), and every claim its reason strings imply still needs [claims-matrix](../product/claims-matrix.md) approval. See [the open conflicts](../README.md#open-conflicts-in-the-imported-hew-drafts). Body unedited from the source draft.

**Author role:** Solution architect · **Version:** 0.1 draft · 21 Nov 2026
Parent documents: `01-cto-technology-strategy.md`, `02-enterprise-architecture.md`. Shared assumptions and glossary: `00-README.md`.
Related designs: SDD-01 (device limits and safety events), SDD-02 (host and UX), SDD-05 (claims and hazard analysis), SDD-06 (sham mode and outcomes).

This is the core intellectual property of HEW. It decides **when to offer, what to offer, and how to learn what works for whom**, without ever diagnosing, detecting emotions, or overriding the device's safety limits.

---

## 1. Purpose and scope

**Purpose.** Turn a stream of feature frames, context and user input into safe, explainable, claim-compliant intervention proposals and sessions, and learn from outcomes.

**In scope:** state model, personal baselines, intervention catalogue, rule policy, safety gates, policy bundle format, decision log, learning (later), simulation and test.
**Out of scope:** signal extraction (SDD-01), UI (SDD-02), cloud analytics (SDD-03), LLM behaviour (doc 04; the engine has no LLM dependency, ADR-009).

**What the engine does not do**
- It does not diagnose, screen or predict any condition.
- It does not name emotions. It reports measured changes against the person's own baseline.
- It cannot raise any device limit (SDD-01 §6.2).
- It does not depend on the internet (AP-1).

---

## 2. Requirements

### 2.1 Functional

| ID | Requirement |
|---|---|
| SDD04-FR-01 | Maintain per-user baselines for pulse, HRV, EDA and skin temperature by time-of-day bin |
| SDD04-FR-02 | Produce an **Arousal-Recovery Model (ARM)** state with a confidence level from each frame window |
| SDD04-FR-03 | Evaluate signed, versioned rules and propose, never silently start, interventions (SDD-02 §5.2) |
| SDD04-FR-04 | Apply hard constraints (§6) that no rule or learning component can bypass |
| SDD04-FR-05 | Record a decision log entry for every proposal, suppression and session (§9) |
| SDD04-FR-06 | Provide a plain-language, claim-safe "why this suggestion" string for every proposal |
| SDD04-FR-07 | Measure outcomes per session (pre/post check-in, post-session recovery window) |
| SDD04-FR-08 | Support study sham mode and yoked schedules controlled by the policy bundle (SDD-06) |
| SDD04-FR-09 | Support remote kill switches per channel through signed bundles |
| SDD04-FR-10 | (Later) Select among pre-approved intervention presets with a contextual bandit (§8) |

### 2.2 Non-functional (assumptions to confirm at G1; A-05)

| ID | Requirement |
|---|---|
| SDD04-NFR-01 | Frame-to-decision under 1 s on supported phones; frame-to-command-ack ≤ 5 s p95 (SDD02-NFR-01) |
| SDD04-NFR-02 | Deterministic: same inputs and bundle give the same decision (reproducible replay) |
| SDD04-NFR-03 | No hard constraint violation in any simulated or recorded replay (target: zero) |
| SDD04-NFR-04 | Runs offline; memory and CPU small enough for the phone without noticeable battery cost (SDD02-NFR-07) |
| SDD04-NFR-05 | Every rule, parameter and bundle is versioned, signed and traceable to a reviewer |

---

## 3. Architecture

```
  Feature frames (SDD-01)      Check-ins, settings        Context
  validity flags, SQI          calm/energy, quiet hours   time of day, activity,
        |                             |                   ambient (optional)
        v                             v                        v
 +----------------------------------------------------------------------+
 |  1. Quality + gating     drop/flag windows with low SQI or motion    |
 |  2. Baseline store       per-user robust baselines by time-of-day bin |
 |  3. ARM estimator        arousal-vs-baseline, recovery trend,         |
 |                          confidence (low/medium/high)                 |
 |  4. Policy evaluator     signed rules over ARM + context -> candidates|
 |  5. Constraint filter    HARD constraints (§6) -> allowed candidates  |
 |  6. Selector             rules first; bandit later (inside approved)  |
 |  7. Explainer            claim-safe reason text + decision log        |
 +----------------------------------------------------------------------+
        |                                   |
        v                                   v
  Proposal to Session manager        Outcome tracker -> baseline/learning update
  (SDD-02 §5.2)                      (pre/post check-in, recovery window)
```

The engine is a pure function of (frames, context, history, bundle) plus a persisted baseline. It lives in the Kotlin Multiplatform core (SDD-02 §3) so iOS and Android behave identically.

---

## 4. State model

### 4.1 ARM (Arousal-Recovery Model)

ARM is a small, transparent summary. It is **not** an emotion or mental-state detector.

| Component | Values | Meaning |
|---|---|---|
| Arousal vs baseline | below / typical / elevated / unknown | Whether pulse, HRV and EDA, taken together, are above or below the person's own usual for this time of day while still |
| Recovery trend | improving / flat / declining / unknown | Direction of resting HRV and pulse versus the person's baseline over days |
| Confidence | low / medium / high | Data quality and coverage: SQI, valid-beat ratio, minutes of still data, baseline maturity |

Rules for `unknown`:
- Missing, stale or low-quality data produces `unknown`, never "typical" (SDD-01 §4.2).
- With `unknown` arousal, the engine makes no automatic proposals (RL-07).

### 4.2 Baselines

- Per-user, per-time-of-day bin (e.g. four bins), because pulse, HRV and skin temperature vary through the day.
- Robust statistics: median and median absolute deviation (MAD). z = (x − median) / (1.4826 × MAD).
- Use only windows that are still, have good SQI and are worn.
- **Baseline period (assumption):** 7 calendar days with at least 20 valid still-hours in total. During this period the engine makes no personalised proposals; the user can start sessions and sees scripted suggestions only.
- Baselines update slowly (long exponential window) so a bad week does not rewrite "normal". Large step changes are flagged for data-quality review, not interpreted.
- Baselines are on-device first; cloud holds a copy for continuity after phone replacement (SDD-03 §7).

### 4.3 What the engine uses from the user

- Calm and energy ratings (two simple items; SDD-02 §7.5).
- Settings: enabled channels, quiet hours, wind-down time, intensity ceilings, automatic mode (default off).

---

## 5. Intervention catalogue

IDs are fixed here and used by every document.

| ID | Intervention | Channels | Default duration (assumption) | Evidence position | Notes |
|---|---|---|---|---|---|
| **I-01** | Paced breathing | Haptic pacing on device + audio guide on phone | 5 min; start near 6 breaths/min; adjustable (assumption; validate) | Closest to published evidence (HRV biofeedback, g = 0.38 in a depression-symptom meta-analysis; not shown for this product) | Anchor intervention |
| **I-02** | Haptic grounding | Slow rhythmic haptic pattern | 3 min | Early (small pilots for haptic devices) | Alternative when breathing guidance is not wanted |
| **I-03** | Warm pulse | Thermal (warm) | Short pulses, 3 min session per README §5 | Plausible, thin | **[Thermal]** only; gated by D-2 |
| **I-04** | Cool pulse | Thermal (cool) | Short pulses | Plausible, thin | **[Thermal]** only |
| **I-05** | Soundscape | Phone audio | 5–15 min | General relaxation content; low claim | No device actuation |
| **I-06** | Daylight and movement nudge | Text prompt | n/a | Light evidence exists, but a nudge is not light therapy | Wording: "a short walk, ideally in daylight" |
| **I-07** | Wind-down sequence | I-01 + I-05, dim-light prompt | 10 min | Supports relaxation and sleep routines; no sleep claim beyond that | At user-set time |
| **I-08** | Reflection check-in | Prompt | 30 s | n/a | Non-actuating; collects calm/energy |

Parameters (pace, duration, intensity, pattern id) are bounded by the policy bundle's **ceilings**, which are in turn bounded by the device limit table.

---

## 6. Hard constraints (cannot be overridden by rules or learning)

| ID | Constraint |
|---|---|
| HC-1 | Device safety lockout active, or a thermal channel locked → no thermal proposals (SDD-01 §6.2, §6.4) |
| HC-2 | Device not worn or data stale → no actuation |
| HC-3 | Quiet hours and "do not disturb" respected |
| HC-4 | Daily caps: proposals (default 3), haptic minutes (default aligned to 10 min/day device budget), thermal sessions (default ≤ 5/day; README case C) |
| HC-5 | Cooldown after any session (default 60 min) |
| HC-6 | A channel the user disabled is never used |
| HC-7 | Policy bundle signature and version must verify; otherwise fall back to the last good bundle, else scripted-only mode |
| HC-8 | Kill-switch flags in the bundle disable the named channel immediately |
| HC-9 | Parameters clamp to ceilings; anything outside is rejected, logged, and replaced by a lower setting |
| HC-10 | No thermal session unless the user has explicitly enabled thermal and acknowledged the guidance |
| HC-11 | Warnings and contraindications from onboarding are honoured (list defined by the physiology advisor and counsel; see §12) |

All constraints are implemented as a final filter that every candidate passes, and each has a test that tries to break it (§11).

---

## 7. Policy: signed rules

### 7.1 Rule structure

```yaml
rule_id: RL-01
title: Sustained elevated pulse while still
version: 3
requires:
  arm.arousal: elevated
  arm.confidence: [medium, high]
  activity: still
  window_minutes: 10            # 20 frames at 30 s
  min_valid_ratio: 0.70
  hr_z: ">= 1.0"                # initial value (assumption)
  rmssd_z: "<= -1.0"            # initial value (assumption)
  baseline_mature: true
propose:
  intervention: I-01
  presets: [standard]
  reason_template: "reason.pulse_higher_than_usual"
limits:
  min_minutes_since_last_session: 60
  max_per_day: 2
mode: propose                    # never "start" unless user enabled automatic mode
```

Thresholds shown are **initial planning values**. They are tuned from G1 shadow-mode data and G2 results (§11), then frozen per bundle version.

### 7.2 Initial rule set

| ID | Rule | Proposes | Notes |
|---|---|---|---|
| RL-01 | Pulse higher and HRV lower than the person's usual for 10+ min while still | I-01 | Core automatic suggestion; opt-in |
| RL-02 | User-set wind-down time reached | I-07 | Scheduled, not inferred |
| RL-03 | After sessions where calm did not improve on several occasions | Next-time alternative (I-02 or I-05) | Never repeated in the same hour (HC-5) |
| RL-04 | Still for 90+ min in user-set daytime, opted in | I-06 | Text only |
| RL-05 | Thermal add-on during I-01 if enabled and gates pass | I-03 or I-04 | **[Thermal]**; D-2 |
| RL-06 | Persistently low self-ratings over two weeks | Support card (non-actuating) | Thresholds from clinical advisor; SDD-02 §7.3 |
| RL-07 | No valid data for several hours | Fit-check prompt; no proposals | Data quality, not a state claim |
| RL-08 | User taps "Start" | User-selected or default I-01 | Always allowed within constraints |

### 7.3 Reason strings (AP-2)

Every proposal carries a reason from a reviewed template. Examples of allowed language:

- "Your pulse has been higher than usual for about 15 minutes while you were still."
- "It's your wind-down time."
- "You've been sitting for a while. A short walk in daylight can help you reset."

Not allowed: "You seem anxious", "You are stressed", "We detected low mood". Reason templates pass the claims linter in CI (EA §12).

### 7.4 Conflict resolution

1. Hard constraints filter first (§6).
2. Highest-priority rule wins: user-initiated > scheduled > data-driven.
3. At most one proposal at a time; suppressed candidates are logged with the reason.

---

## 8. Learning: contextual bandit inside an approved set (ADR-008)

Not in v1. The design is fixed now so data collected in the pilot is usable.

| Aspect | Design |
|---|---|
| Arms | (Intervention, preset) pairs that are already on the approved list: e.g. I-01 with a pace preset, I-02 with a pattern preset |
| Context | Time-of-day bin, activity, arousal state, recent session history, baseline maturity |
| Reward | Primary: change in self-rated calm, pre → post session. Secondary: session completion and a post-session recovery window (not HRV during paced breathing, which is expected to rise during slow breathing and is therefore not evidence of lasting benefit) |
| Algorithm | Thompson sampling or an equivalent simple method; priors come from pilot data; per-user counts kept on device |
| Exploration | Capped (e.g. a small fraction of proposals), never on thermal arms, never when confidence is low |
| Constraints | The constraint filter (§6) runs after selection; bandit cannot add new arms or parameters |
| Governance | Updates ship only as signed bundles after offline policy evaluation, safety-owner approval for actuation-related changes, staged rollout |
| Study mode | Disabled in sham arms and wherever the protocol needs fixed schedules |
| Known risks | Reward hacking by rating habits; novelty effects; delayed outcomes; non-stationary users. Mitigated by weekly review of reward distributions, a reset option, and holding out a small fixed-policy group |

---

## 9. Decision log

Every evaluation that results in a proposal, suppression or session writes one record locally (T1) and uploads it with the next batch (SDD-03 §5).

```json
{
  "decision_id": "uuid",
  "ts": "2026-11-21T09:14:30+05:30",
  "bundle_version": "2026.11.3",
  "engine_version": "0.4.1",
  "arm": {"arousal": "elevated", "recovery": "flat", "confidence": "medium"},
  "inputs_summary": {"hr_z": 1.3, "rmssd_z": -1.2, "valid_ratio": 0.82, "activity": "still"},
  "candidates": ["RL-01:I-01", "RL-04:I-06"],
  "suppressed": [{"rule": "RL-04", "reason": "HC-5 cooldown"}],
  "selected": {"rule": "RL-01", "intervention": "I-01", "preset": "standard"},
  "constraint_checks": {"HC-1": "pass", "HC-2": "pass", "HC-3": "pass", "HC-4": "pass", "HC-5": "pass"},
  "user_response": "accepted",
  "reason_id": "reason.pulse_higher_than_usual"
}
```

Uses: replay and debugging, safety review, claims review of reason strings, learning data, and the explainability screen.

---

## 10. Outcome measurement

| Measure | Window | Use |
|---|---|---|
| Calm and energy ratings | Pre and post session; ad hoc | Primary signal for rules and bandit |
| Session completion and early stops | Per session | Engagement and comfort |
| Resting HRV and pulse (outside sessions) | Days and weeks | Trend display; research analyses |
| Post-session recovery window | 10–30 min after | Secondary signal |
| Adverse and comfort reports | Any time | Safety review (SDD-06) |

Important cautions:
- Within-session HRV during slow breathing reflects the breathing pattern itself, so it is not used as proof of benefit.
- Self-ratings are subject to expectation effects. This is why sham-controlled evidence (SDD-06) gates benefit claims (AP-7).

---

## 11. Verification

| Level | Method |
|---|---|
| Unit | Each rule and each hard constraint with boundary cases |
| Property-based | Random bundles and traces: no constraint ever violated; same inputs → same output |
| Replay | Recorded and synthetic traces through the engine; compare to expected decision logs |
| Shadow mode (G1) | Engine runs and logs proposals without acting; reviewed against user ratings to tune thresholds |
| Simulation | Synthetic users with different baselines, noisy data, gaps and clock errors; measure proposal rate, false-positive "elevated" rate, fatigue |
| Fuzz | Malformed frames, out-of-order sequence, extreme values |
| Hardware-in-the-loop | Engine commands against the device; limit table rejections (SDD-01 §12) |
| Content | Claims linter on reason templates and notifications |
| Governance | Bundle signature and rollback drills |

Metrics tracked from G1: proposals per user per day, acceptance rate, completion rate, rule hit rates, suppression reasons, `unknown` ARM share, replay mismatch count.

---

## 12. Governance and change control

| Change | Approver |
|---|---|
| New or changed rule thresholds | Engine owner + physiology advisor (review) |
| New intervention or preset | Safety owner + physiology advisor |
| Anything that increases actuation (duration, frequency, intensity, thermal) | Safety owner (mandatory) and device limits check |
| Reason strings and notifications | Counsel + safety owner (claims) |
| Contraindication and warning list | Physiology advisor + counsel; reviewed at each release. Initial topics to consider: reduced skin sensation, skin conditions at the wear site, implanted electronic devices (confirm with advisors; this document does not set clinical rules) |
| Bandit updates | Safety owner + data lead after offline evaluation |

Bundles are versioned, signed, staged and reversible (SDD-03 §8).

---

## 13. Failure modes

| Failure | Effect | Response |
|---|---|---|
| Frames missing or stale | Wrong state | ARM = unknown; no proposals; fit-check prompt |
| Clock error or sequence gap | Misordered windows | Gap markers; never interpolate; skip window |
| Baseline corrupted or step-changed | False "elevated" | Quarantine baseline, require re-baseline, flag |
| Over-proposing | User fatigue | Daily caps, cooldown, acceptance-rate monitoring, easy "fewer suggestions" setting |
| Rule conflict | Odd behaviour | Priority order and single-proposal rule (§7.4) |
| Bundle tampered or incompatible | Unsafe behaviour | Signature check (HC-7); fall back |
| Reward drift (later) | Poor personalisation | Review, resets, fixed-policy holdout |

---

## 14. Risks

| ID | Risk | Mitigation |
|---|---|---|
| R-01 | Benefit no better than sham | Sham-controlled pilot (SDD-06) before any benefit claim |
| R-02 | Poor signal quality drives bad proposals | SQI gating, `unknown` state, shadow mode |
| R-04 | Reason strings drift into medical claims | Templates, linter, counsel review |
| R-21 | Personalisation overfits to expectation effects | Sham arms, holdout group, secondary signals |
| R-22 | Users over-rely on the device for emotional regulation | Wording, usage caps, "talk to someone" guidance (SDD-02 §7.3) |

---

## 15. Open items

- Baseline period length and minimum valid data (assumption to tune at G1).
- Initial thresholds in RL-01 (assumptions).
- Default pace for I-01 and the allowed adjustment range.
- Whether automatic (non-user-started) sessions are offered in v1.
- Whether thermal arms ship (D-2).
- Thresholds for the support card (clinical advisor).
