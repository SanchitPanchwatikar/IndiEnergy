# SDD-05 · Security, Privacy, Safety and Compliance

> **Repository status:** Imported draft, source `03-solution-design-05-security-privacy-compliance.md` (v0.1 draft, 21 Nov 2026). Not approved. Its ADR-013/ADR-014 IDs clash with the IDs already used in [the ADR log](../adr/README.md), so they are unresolved proposals, not registered decisions. Its parent documents (`00-README.md`, `01-cto-technology-strategy.md`, `02-enterprise-architecture.md`) are not in this repository yet. See [the open conflicts](../README.md#open-conflicts-in-the-imported-hew-drafts). Body unedited from the source draft.

**Author role:** Solution architect · **Version:** 0.1 draft · 21 Nov 2026
Parent documents: `01-cto-technology-strategy.md`, `02-enterprise-architecture.md`. Shared assumptions and glossary: `00-README.md`.
Related designs: SDD-01 (device), SDD-02 (app), SDD-03 (cloud), SDD-04 (engine), SDD-06 (study), doc 04 (LLM).

**Important.** The legal and regulatory items below are workstreams for qualified counsel and a compliance partner. Only the U.S. FDA General Wellness position was researched (guidance of 6 Jan 2026). India and EU requirements, and all standards numbers, are listed from general knowledge as items to **verify**.

---

## 1. Purpose and scope

Define threats, controls, privacy design, claims governance, safety hazards and compliance work for the whole HEW system. This document is where the architecture principles AP-2, AP-3, AP-4, AP-5, AP-8 and AP-9 become testable controls.

---

## 2. Requirements

| ID | Requirement |
|---|---|
| SDD05-FR-01 | Every device has a unique identity, secure boot and signed updates |
| SDD05-FR-02 | Pairing is authenticated with out-of-band material; pairing mode opens only by physical action |
| SDD05-FR-03 | Data is classified into tiers T0…T5 and handled per EA §5.2 |
| SDD05-FR-04 | Consent is granular, versioned, withdrawable, and enforced in code at ingestion and query |
| SDD05-FR-05 | Identity and physiological data are stored separately (ADR-006) |
| SDD05-FR-06 | A claims policy is enforced by automated checks and human review (AP-2) |
| SDD05-FR-07 | A hazard analysis covers physical, psychological, privacy and bias harms (§13) |
| SDD05-FR-08 | Incident response covers safety, security and privacy incidents (§12) |
| SDD05-NFR-01 | No critical vulnerability open beyond the agreed fix time (target set at G1) |
| SDD05-NFR-02 | All T0 and T2 access is logged and reviewable |
| SDD05-NFR-03 | Security review and penetration test before the pilot (G1→G2) and before launch (G3) |

---

## 3. Assets and trust boundaries

```
   [User] --- touch --- [Wrist unit] ==BLE== [Phone app] ==HTTPS== [Regional cell]
                           |                     |                      |
                     secure boot,           local encrypted        identity vault (T0)
                     limit table            store, keychain        physiology store (T1-T3)
                     hardware cutoff        signed bundles         research store (T5)
                                                                        |
                                                              [LLM provider]  [Partners: ODM, pilot site, glasses]
   TRUST BOUNDARIES: device | BLE link | phone | internet/API | cloud cell | vendor
```

| Asset | Why it matters | Tier |
|---|---|---|
| User identity (name, contact) | Re-identification, fraud | T0 |
| Physiological features | Health-adjacent, intimate | T1 |
| Check-ins and free text | Most sensitive; mental-state information | T2 |
| Device identity keys, signing keys | Control of devices | Critical |
| Firmware and policy bundles | Control of actuation | Critical |
| Research raw data | Re-identification, consent scope | T5 |
| Safety event history | Safety record | T3 |

---

## 4. Device identity, keys and provisioning

| Topic | Design |
|---|---|
| Device identity | Unique key pair generated or injected at manufacturing; certificate or registered public key recorded in the device registry |
| Secure boot | Bootloader verifies image signature and anti-rollback counter (SDD-01 §10) |
| Debug lock | Debug interfaces disabled in production; locking verified at end of line |
| Release signing | Firmware, policy bundles and content packs signed with release keys held offline or in an HSM-backed KMS; two-person control for release signing |
| Key hierarchy | Root of trust → release signing keys → manifests/bundles; separate keys for firmware and for policy bundles; documented rotation and revocation |
| Pairing material | Per-device out-of-band secret (QR or NFC) generated at provisioning; stored hashed or encrypted in the registry; rotated on factory reset (open item §17) |
| Factory process | Secure provisioning station, audited logs, serialisation, limited operator access; ODM contract includes key-handling requirements |
| Field return | Devices wiped and re-provisioned; keys revoked on loss reports |

---

## 5. Threat model (STRIDE summary)

### 5.1 Wrist unit and BLE

| Threat | Example | Controls |
|---|---|---|
| **S**poofing | Rogue phone bonds to a device; fake device pairs with the app | LE Secure Connections with OOB data; physical pairing window; device identity checked by the cloud registry |
| **T**ampering | Modified firmware; replayed or forged commands | Signed images; anti-rollback; encrypted/authenticated link; device-side limit table and command validation (SDD01-NFR-08) |
| **R**epudiation | Dispute over what the device did | Event log on device; safety events persisted and uploaded |
| **I**nformation disclosure | Sniffing frames over the air | Encrypted link; features only; raw data only in research mode |
| **D**enial of service | Battery drain via connection abuse; jamming | Connection parameter limits; rate limits; local fallback (SDD-01 §7.5) |
| **E**levation of privilege | Command that exceeds safe limits; DFU abuse | Limit table; remote config may tighten only (ADR-013); DFU requires signature |

**Pairing and re-pairing (open design).** The OOB secret printed with the product protects against over-the-air attackers but not against someone who sees the packaging. Mitigations: pairing mode requires a physical button hold, the device bonds to one phone at a time, a second phone requires a deliberate factory-reset sequence on the device plus app confirmation, and the OOB secret rotates on reset. The exact flow needs a security review before EVT.

### 5.2 Phone app

| Threat | Controls |
|---|---|
| Local data theft (lost phone, malware) | Encrypted store; keys in Keychain/Keystore; no sensitive content in logs; sensitive screens hidden from screenshots where the OS allows |
| Tampered bundle or content | Signature verification before use (SDD-02 §9) |
| Traffic interception | TLS; certificate pinning with a rotation plan |
| Rooted/jailbroken device | Detection as a risk signal, not as a hard block; no secrets stored outside secure storage |
| Third-party SDK leakage | No advertising or behavioural analytics SDKs on T1/T2 data; SDK allow-list reviewed |

### 5.3 Cloud

| Threat | Controls |
|---|---|
| Credential theft, account takeover | Managed identity, MFA option, anomaly detection, rate limits |
| API abuse and injection | WAF, input validation, schema enforcement, least-privilege service roles |
| Insider misuse | Role separation, JIT access, break-glass with audit, pseudonymisation service as the only join (SDD-03 §6.4) |
| Data exfiltration | Private networking, no public buckets, egress controls, anomaly alerts on bulk reads |
| Supply chain | Dependency scanning, SBOM, signed artifacts, pinned versions |
| Mis-scoped consent | Purpose checks at ingestion and query; tests with deliberately mis-scoped data |
| Misconfiguration | IaC with policy checks; drift detection |

### 5.4 LLM and partners

| Threat | Controls |
|---|---|
| Prompt injection via check-in notes or chat | User content treated as data; schema-validated outputs; no tools with side effects (doc 04 §10) |
| Sensitive data sent to a model provider | Redaction, aggregation, consent gate, regional endpoint, contractual limits (§14) |
| Partner data leak (ODM, pilot site, glasses) | Data processing agreements, minimum data sharing, access reviews |

---

## 6. Privacy architecture and consent

### 6.1 Principles in practice

| Principle | Implementation |
|---|---|
| Minimisation (AP-4) | Features, not raw signals, by default; short retention for T2; no audio recorded; ambient noise level only |
| Separation (AP-5) | Identity vault vs physiology store; pseudonym map in a single service |
| Purpose limitation | Consent purposes enforced in code; analytics roles cannot reach T0 |
| Transparency | Plain-language notices in onboarding and settings; what each channel collects and why |
| User control | In-app export, deletion, withdraw consent; granular toggles |
| Residency (AP-8) | Region-pinned cells; no cross-region movement of T0…T2 |

### 6.2 Consent matrix

| Purpose | Required? | Data | Withdrawal effect |
|---|---|---|---|
| Core service | Yes | T0, T1, T2 (check-ins), T3 | Account closure and deletion |
| Raw research data | No | T5 | Stop collection; delete per study terms |
| Companion chat (D-7) | No | T2 (chat text) | Chat disabled; stored chat deleted |
| Health platform integration | No | Data read from or written to HealthKit/Health Connect | Integration removed |
| Shared heartbeat (v1.5) | No | T1 shared with a named person | Sharing ends |
| Product improvement analytics | No | Aggregated T3/T4 | Analytics excluded |
| Study participation | No | Per protocol (SDD-06) | Per protocol; some retention exceptions possible |

Consents are versioned. A new purpose or a materially changed notice requires fresh consent. Raw research consent is separate from everything else and is never bundled.

### 6.3 Sensitivity notes

- Mental-state-adjacent data is sensitive in practice even where the law does not label it so. HEW treats T2 as the most sensitive tier and never uses it for advertising or for decisions about the person by third parties.
- No sale of data. Any sharing for research is de-identified, consented and reviewed.
- Employers and insurers: any B2B wellness model (D-8) must prevent individual-level data from reaching the employer; only aggregated reports above a minimum cohort size.

### 6.4 DPIA

A data protection impact assessment is completed before the pilot and updated before launch (G3). Scope: purposes, data flows, risks (physical, psychological, privacy, bias), mitigations, residual risk, sign-off by the compliance owner.

### 6.5 Minors

Adults only in v1 (ADR-010): age gate at sign-up, no marketing aimed at minors, support process for suspected minors. Children's data rules are strict in several jurisdictions; this is one reason for the adult-only decision.

---

## 7. Compliance workstreams (indicative; verify each)

| Area | Status | Workstream |
|---|---|---|
| **U.S. FDA General Wellness (6 Jan 2026)** | Researched | Keep products low-risk, non-invasive, with validated measures and no disease or treatment claims. Re-check if any claim, feature or hardware changes |
| **India — personal data** (DPDP Act and rules) | **Not reviewed** | Counsel to confirm: notice and consent format, rights handling, retention, breach notification, cross-border transfer rules, obligations for larger data handlers, children's data treatment |
| **India — device and wellness claims** | **Not reviewed** | Counsel to confirm whether any device regime applies at the claim level chosen; consumer protection and advertising rules; mandatory registration and radio approvals (e.g. BIS, WPC) |
| **EU GDPR** (if selling there) | **Not reviewed** | Health-related data as special-category data needing explicit consent; DPIA; data transfers; representative |
| **HIPAA** | Conditional | Applies only if HEW acts for a U.S. covered entity (e.g. a clinic offering the device); otherwise not |
| **Product safety, battery, EMC, radio** | Indicative list in SDD-01 §13 | Compliance partner confirms; test plan before DVT |
| **Research ethics and trial registration** | To confirm | Ethics approval; registration before enrolment; consent forms (SDD-06) |
| **App store health rules** | To verify | Track current Apple and Google policies for health-adjacent apps |
| **Consumer claims and advertising** | To confirm | Claims policy (§9) checked by counsel before launch |

**Medical pathway trigger.** If product direction moves toward diagnosing, treating or preventing a condition, or toward clinical-adjunct claims, the regulatory category changes and this design needs a new plan (quality system, clinical evidence, premarket route). That decision belongs to the founder with counsel and must not happen through marketing copy.

---

## 8. Security decisions

These extend the ADR list in `02-enterprise-architecture.md` (§9) and are recorded there as well.

| ID | Decision | Rationale | Consequence |
|---|---|---|---|
| ADR-013 | **Remote configuration may tighten device safety limits but never loosen them. Loosening requires a signed firmware release.** | A compromised cloud or phone must not be able to make the device less safe | Limit increases follow the slower firmware release process and safety-owner approval |
| ADR-014 | **Kill switch and safety lockout are delivered by signed policy bundles and acted on by the device, and survive reboot** | Fast field response to a safety event | Bundle service is critical infrastructure; kill-switch drills required |

---

## 9. Claims governance (AP-2)

### 9.1 Claims policy

| Class | Examples | Allowed? |
|---|---|---|
| Wellness benefit, hedged and supported | "Helps you feel calmer", "supports relaxation" | Yes, only after evidence review (AP-7) |
| Measurement statements | "Shows your HRV trend" | Yes |
| Context statements | "Responds to your surroundings" | Yes |
| Disease, diagnosis, treatment, prevention | "Treats depression", "reduces anxiety disorder", "detects anxiety", "predicts burnout" | **No** |
| Physical-mechanism claims | "Transfers energy to your body", "balances your aura" | **No** |
| Comparative or superiority claims | "Better than therapy/medication" | **No** |

### 9.2 Automated checks

- **Claims linter in CI** on app strings, notification templates, policy reason templates, marketing pages, and prompt files. Matches banned patterns and flags review-needed patterns.
- Starter pattern groups (maintained by counsel; case-insensitive):

| Group | Examples (illustrative) |
|---|---|
| Disease terms | depress, anxiety disorder, ptsd, adhd, insomnia treatment, clinical |
| Treatment verbs | treat, cure, heal, diagnose, therapy for, prevent |
| Detection verbs about states | detects anxiety, knows you're depressed, predicts burnout |
| Energy-transfer language | transfers energy, absorbs energy, aura, chakra, biofield |
| Review-needed | stress score, mental health, mood disorder, "proven", "clinically" |

- A second layer: an LLM claims reviewer on drafts (doc 04 §5.3) as an assistant to humans, not a replacement.

### 9.3 Human review and ownership

- Claim wording changes need counsel and safety-owner approval.
- A claims register lists each approved claim, its evidence, limits and where it appears.
- Marketing, support scripts, sales decks and partner materials use the same register.

---

## 10. Control catalogue (summary)

| Layer | Controls |
|---|---|
| Device | Secure boot; signed updates; debug lock; limit table; hardware cutoff; encrypted BLE; physical pairing; event log |
| Phone | Encrypted store; secure keystore; signature checks; pinning; no sensitive logs; consent manager; minimal permissions |
| Cloud | Per-cell KMS; envelope encryption; private networking; RBAC/ABAC; WAF; audit logging; IaC policy checks; backups with lifecycle; DSR orchestration |
| Data | Tiering; field-level encryption for T2; row-level deletion; crypto-shredding; pseudonymisation service; retention jobs |
| Process | Threat modelling; code review; dependency and secret scanning; SBOM; staged rollouts; incident drills; vendor reviews |
| People | Training; background checks per policy; least privilege; offboarding |
| LLM | Redaction; consent gate; schema-validated outputs; evaluation gates; no side-effect tools (doc 04) |

---

## 11. Secure development lifecycle

| Stage | Practice |
|---|---|
| Design | Threat model for each new feature; privacy review; tier tag on new fields |
| Build | Code review; static analysis; dependency and secret scanning; reproducible builds; firmware fuzzing of BLE parsers |
| Test | Security tests in CI; mis-scoped consent tests; actuation-limit tests (SDD-01 §12) |
| Release | Signed artifacts; SBOM; staged rollout; rollback plan |
| Operate | Monitoring; vulnerability management with fix times; periodic access reviews |
| Assure | Penetration tests (app, API, device/BLE) before pilot and before launch; vulnerability disclosure policy; periodic external review |

---

## 12. Incident response

| Class | Examples | Response |
|---|---|---|
| **Safety** (Sev-1) | SE-01…SE-04 in the field; reports of burns or skin injury | Immediate triage; kill switch for the affected channel; pause rollouts; contact affected users; root cause; regulator and insurer notification as advised by counsel; corrective action before re-enabling |
| **Security** | Key compromise; account takeover wave; malicious update attempt | Contain, rotate keys, revoke devices as needed, forensic review, notify as required |
| **Privacy** | Mis-scoped data exposure; unauthorised access to T0/T2 | Contain, assess impact, notify regulators and users as required by law (verify per jurisdiction), remediate |
| **Quality** | Systematic sensor failures; bad firmware | Halt rollout, rollback, communicate |

Needed: named incident commander, on-call rota, runbooks, contact lists, a decision log, post-incident review within a set time, and a recall-readiness plan before launch (G3).

---

## 13. Hazard analysis (summary safety case)

| ID | Hazard | Causes | Controls | Verification |
|---|---|---|---|---|
| H-01 | Skin burn from thermal element | Driver stuck; sensor failure; unattended output | SDD-01 §6 layers; hardware cutoff; wear detection; duty limits; lockout | Bench fault injection; HIL; end-of-line trip test |
| H-02 | Skin irritation or allergy | Materials, sweat, tight strap | Materials testing; fit guidance; stop thermal on reports | Biocompatibility testing; human-factors review |
| H-03 | Battery overheating or fire | Cell fault; charger fault | Protection IC; certified cell and pack; charger limits | Battery standards testing; abuse tests |
| H-04 | Distraction (e.g. haptic prompts while driving or operating machinery) | Unwanted proposals | Proposal-only default; quiet hours; guidance in onboarding; haptic cap | UX review; user testing |
| H-05 | False reassurance or alarm from metrics | Misread trends; noisy data | Plain wording; confidence flags; unknown state; no scores implying diagnosis | Content review; user comprehension testing |
| H-06 | Over-reliance or avoidance of professional care | Marketing; companion chat | Claims policy; "talk to someone" guidance; companion limits (doc 04 §9) | Red-team tests; review of user feedback |
| H-07 | Crisis not recognised | Free text or ratings indicate risk | Crisis layer (doc 04 P-06); support card; not-a-crisis-tool messaging | Red-team set; clinical advisor review |
| H-08 | Privacy harm from exposure of mental-state-adjacent data | Breach; misuse; employer access | Tiering; encryption; minimisation; B2B aggregation rules | Pen test; DPIA; audits |
| H-09 | Bias: lower accuracy on darker skin or other groups | PPG optics; algorithms | Multi-wavelength options; subgroup testing; transparent limitations | G1 accuracy test; pilot subgroup analysis |
| H-10 | Harm from LLM output | Hallucination; boundary violation; injection | Non-actuating role; schema; guardrails; evaluation gates | Evals and red-team (doc 04 §7) |
| H-11 | Harm from stopped or lost support (device or app fails mid-need) | Service end; bugs | Honest "not a crisis tool" messaging; offline operation; end-of-life policy | Reliability tests; policy review |

Each hazard has an owner, review date and status in a living register.

---

## 14. Vendors and third parties

| Vendor | Data | Requirements |
|---|---|---|
| Cloud provider | T0…T5 (encrypted) | Region control; encryption keys under HEW control; data processing agreement; certifications reviewed |
| LLM provider (optional) | Redacted text, aggregates | No training on HEW data; limited or zero retention; regional endpoint where possible; audit rights (verify terms) |
| ODM/EMS | Device keys and firmware | Key-handling controls; audits; confidentiality |
| Pilot site / CRO | T1, T2, T5 for participants | Data processing agreement; ethics approvals; access limits |
| Glasses partner (later) | Minimal event data | Contract; no raw physiology; consent |
| Analytics and crash tools | Tier-3 diagnostics only | No T1/T2 content; allow-list |

---

## 15. Assurance plan

| Activity | Timing |
|---|---|
| Threat model review | Each major feature; before pilot and launch |
| Penetration tests: API, app, device/BLE | Before G2; before G3; yearly |
| Firmware security review and fuzzing | Before pilot; before launch |
| Privacy review and DPIA | Before pilot; update before launch |
| Claims review | Every release that changes copy or features |
| Red-team LLM features | Before any enablement; then each major change |
| Tabletop incident exercises | Twice a year; before launch |
| External audit | Scope after counsel's advice |

---

## 16. Risks

| ID | Risk | Mitigation |
|---|---|---|
| R-04 | Claims drift into medical territory | §9; linter; counsel |
| R-07 | Privacy and regulatory non-compliance | §6, §7; DPIA; counsel |
| R-09 | LLM harm | §5.4; doc 04 |
| R-11 | Patent exposure | Freedom-to-operate review (not security, tracked here for completeness) |
| R-23 | Key compromise | Offline/HSM keys; rotation; revocation; drills |
| R-24 | Insider access to sensitive data | RBAC, JIT, audit, pseudonymisation |
| R-25 | Regulatory scope creep from product ambition | Governance gate (§7 "Medical pathway trigger") |

---

## 17. Open items

- India and EU counsel reviews (§7) — not yet done.
- Pairing and re-pairing flow security review.
- Retention periods per tier (EA §5.4).
- Standards list and test plan with a compliance partner.
- Position on de-identified data and models after deletion (SDD-03 §10).
- Insurance and liability coverage for a body-contact device.
- Vulnerability disclosure policy text.
