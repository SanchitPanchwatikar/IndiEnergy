# SDD-06 · Validation and Pilot System

> **Repository status:** Imported draft, source `03-solution-design-06-validation-pilot-system.md` (v0.1 draft, 21 Nov 2026). Not approved. It designs a pilot system, not an approved protocol; no study may start until the repo's safety, privacy and ethics gates in [docs/README.md](../README.md#governance) are signed. Its parents (`00-README.md`, `01-cto-technology-strategy.md`, `02-enterprise-architecture.md`) are not in this repository yet. See [the open conflicts](../README.md#open-conflicts-in-the-imported-hew-drafts). Body unedited from the source draft.

**Author role:** Solution architect · **Version:** 0.1 draft · 21 Nov 2026
Parent documents: `01-cto-technology-strategy.md`, `02-enterprise-architecture.md`. Shared assumptions and glossary: `00-README.md`.
Related designs: SDD-01 (devices and safety events), SDD-02 (study mode), SDD-03 (data and exports), SDD-04 (sham mode), SDD-05 (consent, privacy, hazards).

**Important.** This document designs the **system** that runs and records a pilot. It is not a study protocol. A physiology/clinical advisor, a biostatistician, an ethics committee and counsel must own the real protocol, eligibility rules, outcome choice and sample size.

---

## 1. Purpose and scope

The pilot answers one question for gate G2: **does the closed-loop system help adults feel calmer more than a credible sham does, safely?** It also generates the evidence that decides which channels survive (AP-7).

**In scope:** study design options, sham design, randomisation and blinding, data capture, safety monitoring, analysis plan outline, data flows, operations, quality.
**Out of scope:** medical or clinical-trial claims about any disease; regulatory submissions.

---

## 2. Requirements

### 2.1 Functional

| ID | Requirement |
|---|---|
| SDD06-FR-01 | Electronic consent and enrolment with eligibility checks and an age gate (18+) |
| SDD06-FR-02 | Randomisation with allocation concealment; participants and outcome assessors blinded |
| SDD06-FR-03 | Arms shown to participants only as neutral program labels (SDD-02 §7.1) |
| SDD06-FR-04 | Device and engine configuration per arm delivered by signed study bundles; configuration locked per study |
| SDD06-FR-05 | Scheduled questionnaires and check-ins with reminders and completion tracking |
| SDD06-FR-06 | Adverse event and comfort report capture with triage workflow and clinician review |
| SDD06-FR-07 | Automatic linkage of device safety events (SE-xx, SDD-01 §6.4) to adverse event records |
| SDD06-FR-08 | Duty-of-care pathway for participants who report persistently low ratings or crisis language |
| SDD06-FR-09 | Raw data capture (T5) only for consented participants (SDD-01 §9.4) |
| SDD06-FR-10 | Blinded exports for analysts; unblinding only through a controlled procedure |
| SDD06-FR-11 | Full audit trail on enrolment, randomisation, protocol and configuration changes, and data access |
| SDD06-NFR-01 | Study data reproducible: protocol version, software versions, bundles and analysis code are all recorded per participant-day |
| SDD06-NFR-02 | No participant identity in analyst datasets (AP-5) |

---

### 2.3 Design principles for the pilot

1. **Pre-register** the primary outcome, analysis plan and decision rules before the first enrolment.
2. **Sham must be credible**: same device, same prompts, same effort, no contingent benefit.
3. **Safety before sample size**: stopping rules are defined up front.
4. **Equal sensing in all arms**: the device measures the same things for everyone, so data quality can be compared.
5. **Measure what the claim will say.** A benefit claim is limited to the outcome and population the pilot tested.

---

## 3. Study design options

| Option | Description | Pros | Cons |
|---|---|---|---|
| **A. Within-person crossover, sham-controlled** | Each person uses active then sham (or the reverse) in blocks, with a washout | Needs fewer participants; each person is their own control | Carry-over; period effects; unblinding if differences are obvious; longer participation |
| **B. Two-arm parallel, sham-controlled** | People use active or sham throughout | Simple; no carry-over | Needs more participants |
| **C. Three-arm** | Full loop vs sham vs a simple active comparator (e.g. audio-only breathing) | Shows whether haptics or the loop add value beyond audio | Larger; more complex |

**Recommendation for the first pilot (to be confirmed by the biostatistician):** Option A for the channel-level question "does haptic + audio guidance beat a credible sham?", with Option C as a later study if the result is positive and D-2 (thermal) needs its own test.

### 3.1 Sham design

| Channel | Active | Sham |
|---|---|---|
| Paced breathing (I-01) | Haptic pacing aligned with audio guide | Same audio style and duration; haptic pattern irregular and non-paced so it cannot guide breathing; same intensity and duration |
| Haptic grounding (I-02) | Slow rhythmic pattern | Perceptible but irregular pattern, same total vibration time |
| Thermal (I-03, I-04) **[Thermal]** | Warm/cool pulse inside the design cap | Near-neutral skin-temperature change that is perceptible but within a very small range; values set by the physiology advisor and verified safe |
| Timing | Closed-loop: responds to the person's state | **Yoked schedule**: replays the session timing of a matched active participant, so sham is not contingent on the sham person's own state |

Credibility checks: at the end of each period, participants guess their assignment and rate how convincing and comfortable it was; a blinding index is reported. Sham settings are tested with a few pre-pilot volunteers for plausibility and safety.

### 3.2 Outcomes (candidates; the biostatistician and advisor pre-register the primary)

| Outcome | Type | Notes |
|---|---|---|
| Change in self-rated calm, pre → post session, averaged per period | Candidate primary | Close to the claim "helps you feel calmer"; vulnerable to expectation, hence sham |
| Perceived stress over a period (e.g. PSS-10) | Candidate primary or key secondary | Validated scale; wording avoids disease framing |
| Wellbeing index (e.g. WHO-5) | Secondary | Validated; also requires a duty-of-care pathway for low scores |
| Resting HRV (RMSSD) outside sessions | Secondary, objective | Within-session HRV during slow breathing is not used as evidence (SDD-04 §10) |
| Sleep diary measures | Secondary | Device-derived sleep not validated in this design |
| Session completion, early stops | Engagement | |
| Adverse events and comfort | Safety | |
| Blinding index | Integrity | |

Scales are used only in study mode (SDD-02 §7.5). Final instruments and any licensing are confirmed by the advisor.

### 3.3 Sample size: illustrative only

The biostatistician will compute the real number from pilot variance and a minimal important difference. The table shows how fast numbers grow as the standardised effect shrinks. Method: two-sided α = 0.05, power 80%, t-test based power, with 20% allowance for dropout. A standardised effect of 0.4 is used only as a planning anchor because a published HRV-biofeedback meta-analysis reported g = 0.38 for depressive symptoms; that is a different outcome and population, and a smaller effect is plausible for this product.

| Standardised effect (d) | Crossover: participants needed | Crossover incl. 20% dropout | Parallel: per arm | Parallel incl. 20% dropout (per arm) | Parallel total |
|---|---|---|---|---|---|
| 0.2 | 199 | 249 | 394 | 493 | 986 |
| 0.3 | 90 | 113 | 176 | 220 | 440 |
| 0.4 | 52 | 65 | 100 | 125 | 250 |
| 0.5 | 34 | 43 | 64 | 80 | 160 |

Reading: a crossover design needs roughly half the participants of a parallel design at the same effect size, but depends on the assumption that carry-over is small. Treat all numbers as illustrative (A-05).

---

## 4. System architecture

```
  Participants (study mode in app)             Study staff (console)
       |  consent, check-ins, wear                |  enrol, monitor, triage AEs
       v                                          v
  +-----------------------------------------------------------------+
  |  STUDY MANAGEMENT SERVICE (A10, in the regional cell)           |
  |   Protocol registry  | Eligibility + e-consent | Randomisation  |
  |   Blinding manager   | Schedule engine         | AE workflow    |
  |   Study bundle publisher (signed)  | Export service            |
  +----------------+--------------------+---------------------------+
                   |                    |
        Study bundles (SDD-03 §8)   Study data store (T1, T2, T5, pseudonymous)
                   |                    |
           Phone app + wrist unit    Blinded exports --> Analysts (no identity)
                                      Unblinded key held by independent custodian
```

### 4.1 Components

| Component | Responsibility |
|---|---|
| Protocol registry | Versioned protocol, eligibility, schedules, outcome definitions; amendments tracked |
| Eligibility and e-consent | Screens inclusion/exclusion; presents consent; records version and timestamps; supports withdrawal |
| Randomisation service | Blocked, stratified randomisation; allocation concealed from staff and participants; sealed allocation record |
| Blinding manager | Maps arms to neutral labels; controls unblinding (emergency and planned) |
| Schedule engine | Sends questionnaire and check-in schedules; reminders; period switching in crossover |
| Study bundle publisher | Packages engine and device configuration for each arm, signed and versioned (SDD-04 sham mode) |
| AE workflow | Capture, triage, escalate, close; links device events |
| Export service | Produces analysis-ready datasets with arm codes hidden |
| Audit service | Immutable log of all study actions |

### 4.2 Data model (study metadata, relational)

| Table | Key fields |
|---|---|
| studies | study_id, protocol_version, status, registration id |
| arms | arm_id, study_id, internal label, neutral label |
| participants | participant_id (study pseudonym), pseudonym_id link (restricted), status, stratum |
| consents | participant_id, consent_version, raw_data_consent, timestamps |
| randomisation | participant_id, sequence/arm assignment (sealed), period schedule |
| periods | participant_id, period number, arm, start, end |
| instruments | instrument_id, version, items, scoring rules |
| responses | participant_id, instrument_id, timestamp, item values |
| bundles | bundle_id, arm, firmware/engine versions, signature info |
| adverse_events | ae_id, participant_id, source (user, device SE-xx, staff), severity, status, causality assessment |
| unblinding_log | who, when, why, scope |

---

## 5. Randomisation and blinding

- Stratification factors (e.g. site, baseline category, skin-tone group for sensor performance) are chosen by the biostatistician.
- Allocation sequence is generated by an independent party, stored sealed, revealed only per participant at enrolment.
- Staff who interact with participants do not see arm assignments. Support scripts avoid hints.
- Study bundles differ by arm but app UI is identical; the device pattern differences are the only active/sham difference.
- **Emergency unblinding** is available to the safety lead only, logged, with reasons.
- **Planned unblinding** happens after database lock and analysis plan freeze.

---

## 6. Safety monitoring

| Item | Design |
|---|---|
| Adverse events | Participant report button; staff report; automatic from device SE-xx; severity grading; causality review by clinician |
| Stopping rules | Defined up front: for example any thermal injury event stops thermal arms pending review; thresholds for other events set by the advisor and ethics committee |
| Independent review | A small independent reviewer or committee reviews safety data at set points |
| Device events | SE-01…SE-04 create a Sev-1 and an AE record automatically; participant contacted the same day (SDD-05 §12) |
| Duty of care | If a participant reports persistently low ratings, a low wellbeing score or crisis language, the study team follows a pre-agreed referral protocol: contact, encourage professional support, share region-appropriate resources, and document. The app is not a crisis tool, and this is stated in the consent form |
| Participant withdrawal | Always allowed; data handling per consent |

---

## 7. Analysis plan outline (statistician to complete)

| Topic | Outline |
|---|---|
| Populations | Intention-to-treat primary; per-protocol sensitivity |
| Primary analysis | Mixed-effects model on the pre-registered primary outcome, with period and sequence terms for crossover; sham versus active contrast |
| Carry-over | Test and sensitivity analysis; if substantial, use first-period data only |
| Missing data | Pre-specified approach; report missingness by arm; sensitivity analyses |
| Multiplicity | One primary outcome; secondary outcomes labelled exploratory or adjusted |
| Subgroups | Skin tone and sensor quality, age bands, baseline levels; reported with caution |
| Sensor performance | Agreement with reference measures; completeness by subgroup (SDD01-NFR-04) |
| Blinding | Report blinding index and guess accuracy |
| Safety | Adverse events by arm; device events |
| Reporting | Pre-registered plan, effect size with confidence interval, complete disclosure of null results |

### 7.1 Decision rules for gate G2 (to be set quantitatively before enrolment)

| Result | Action |
|---|---|
| Effect on the primary outcome clearly above sham, with an acceptable safety record | **Proceed**: claims limited to what was tested; plan the larger confirmatory study |
| Effect present for one channel (e.g. haptic) but not another (e.g. thermal) | **Change channel mix**: drop or defer the non-performing channel (affects D-2) |
| No credible difference from sham, or unresolved safety signal | **Stop or pivot** (01 §8 kill/pivot triggers) |

Thresholds (for example a minimum effect size and a confidence-bound criterion) are chosen with the biostatistician and written into the pre-registration.

---

## 8. Data flows and privacy

| Data | Path | Controls |
|---|---|---|
| Identity and consent | Participant → study console → identity vault (T0) | Only the study coordinator role |
| Features, sessions, check-ins | Phone → ingestion → study dataset by pseudonym | Consent-purpose enforced (SDD-03 §5) |
| Raw signals (T5) | Device buffer → phone → separate bucket and keys | Separate consent; study-scoped access; retention per protocol |
| Questionnaires | App → study service | Linked by participant ID |
| Exports | Blinded datasets with study IDs | No identity; arm codes hidden until unblinding |
| Unblinding key | Held by an independent custodian | Release only under the procedure |

Re-contact and duty-of-care flows need pseudonym lookup through the pseudonymisation service, with each use logged (SDD-03 §6.4).

---

## 9. Operations

| Area | Plan |
|---|---|
| Registration and approvals | Register the study where required and obtain ethics approval before enrolment (verify local requirements with counsel and the pilot partner) |
| Recruitment | Pilot site or CRO; inclusion and exclusion per protocol; incentive policy approved by ethics |
| Onboarding | Device kit, fit check, safety guidance, training for staff on neutral scripts |
| Device logistics | Serial tracking; returns; replacement process; firmware locked per study |
| Monitoring | Weekly data-quality review: wear time, questionnaire completion, missingness by arm |
| Support | Single support channel with blinded scripts; escalation to the safety lead |
| Closing | Participant debrief, device return or retention per consent, data lock, analysis |

---

## 10. Quality and integrity

- Audit trail on every study action, immutable and exportable.
- Protocol and bundle changes follow amendment control; no mid-study configuration changes without recorded approval.
- Data validation rules at ingestion and in curation; out-of-range and impossible values flagged, not corrected silently.
- Analysis code versioned; datasets and results reproducible from recorded versions.
- Periodic internal audit of consent records, randomisation integrity and blinding procedures.

---

## 11. Risks

| ID | Risk | Mitigation |
|---|---|---|
| R-01 | No difference from sham | Pre-registration; decision rules; scope kept small |
| R-26 | Sham perceived as inert → unblinding | Credible sham, pre-pilot plausibility check, blinding index |
| R-27 | Carry-over in crossover | Washout; carry-over test; first-period sensitivity analysis |
| R-28 | Expectation effects dominate | Sham, yoked schedule, objective secondary outcomes |
| R-29 | Duty-of-care failure | Referral protocol, training, clinician involvement |
| R-12 | Sensor bias across skin tones | Stratify or analyse by subgroup; report accuracy |
| R-30 | Data protection error in research mode | Separate consent, separate store and keys, DPIA |
| R-31 | Pilot cost and timeline overrun | Phase gates, quotes before commitment (D-5) |

---

## 12. Open items

- Pilot site or CRO, ethics route, registration route (D-5).
- Primary outcome and instruments (advisor + biostatistician).
- Washout length and period length for crossover.
- Sham settings for thermal (physiology advisor).
- Eligibility and exclusion list (advisor + counsel).
- Participant incentives and duty-of-care protocol details.
- Whether to include a third audio-only arm in the first pilot.
