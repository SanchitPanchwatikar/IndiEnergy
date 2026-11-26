# SDD-03 · Cloud and Data Platform

> **Repository status:** Imported draft, source `03-solution-design-03-cloud-data-platform.md` (v0.1 draft, 21 Nov 2026). Not approved. Its parent documents (`00-README.md`, `01-cto-technology-strategy.md`, `02-enterprise-architecture.md`) are not in this repository yet, and the AWS reference and region choices it assumes are not settled here — hosting remains TBD under [ADR-0012](../adr/0012-website-and-prototype-stack.md). See [the open conflicts](../README.md#open-conflicts-in-the-imported-hew-drafts). Body unedited from the source draft.

**Author role:** Solution architect · **Version:** 0.1 draft · 21 Nov 2026
Parent documents: `01-cto-technology-strategy.md`, `02-enterprise-architecture.md`. Shared assumptions and glossary: `00-README.md`.
Related designs: SDD-02 (client), SDD-05 (privacy and security controls), SDD-06 (study data), doc 04 (LLM gateway).

---

## 1. Purpose and scope

The cloud stores, analyses and updates. It never controls the loop (AP-1, A-04). It provides identity and consent, ingestion, storage, analytics, weekly insights, device registry and over-the-air (OTA) delivery, study data exports, and an optional gateway to language models.

**In scope:** logical and AWS reference architecture, regional cells, APIs, data stores, ingestion pipeline, OTA, analytics, deletion, observability, resilience, cost drivers.
**Out of scope:** on-device and on-phone logic; detailed security control catalogue (SDD-05).

---

## 2. Requirements

### 2.1 Functional

| ID | Requirement |
|---|---|
| SDD03-FR-01 | Account, authentication and consent services; consent purposes enforced at ingestion and query time |
| SDD03-FR-02 | Idempotent batch ingestion of frames, sessions, check-ins and safety events |
| SDD03-FR-03 | Separate identity store (T0) and physiology store (T1…T3) linked only by a pseudonymous ID (AP-5, ADR-006) |
| SDD03-FR-04 | Lake with raw (bronze), cleaned (silver) and analysis-ready (gold) layers |
| SDD03-FR-05 | Device registry, release channels, signed manifests, staged OTA with rollback |
| SDD03-FR-06 | Insights service: weekly trends and neutral summaries for the app |
| SDD03-FR-07 | Study management APIs and exports for pilots (SDD-06) |
| SDD03-FR-08 | Data subject requests: export, correction, deletion across all stores (§10) |
| SDD03-FR-09 | Admin and support console with least-privilege, audited access |
| SDD03-FR-10 | Incident telemetry for safety events with alerting (01 §9) |
| SDD03-FR-11 | Region-pinned stacks; no cross-region movement of T0…T2 data (AP-8) |
| SDD03-FR-12 | Optional LLM gateway with redaction, logging and guardrails (doc 04) |

### 2.2 Non-functional (assumptions to confirm at G1; A-05)

| ID | Requirement |
|---|---|
| SDD03-NFR-01 | Ingestion availability 99.9% monthly |
| SDD03-NFR-02 | Recovery point objective ≤ 15 min; recovery time objective ≤ 4 h for the primary cell |
| SDD03-NFR-03 | Ingestion handles 3,333 frames/s average at 100,000 users and a burst factor of 5 (assumption; client jitter reduces bursts) |
| SDD03-NFR-04 | Deletion requests completed within the period set by counsel (design target: 30 days, shorter for T2) |
| SDD03-NFR-05 | Every access to T0 and T2 is logged and reviewable |
| SDD03-NFR-06 | All infrastructure defined as code; environments reproducible |
| SDD03-NFR-07 | Schema changes backward compatible (ADR-007) |

---

## 3. Logical architecture

```
                         PHONE APPS
                             |
                     HTTPS (API gateway)
                             |
   +-------------------------v--------------------------------------------+
   |                      REGIONAL CELL (one per region)                  |
   |                                                                      |
   |  Edge/API gateway --> Auth (managed identity) --> Consent service     |
   |        |                                              |              |
   |        v                                              v              |
   |  Ingestion API --> Validation/dedupe --> Event stream  Identity vault |
   |                                              |         (T0, relational)|
   |                         +--------------------+---+          ^         |
   |                         v                        v          |         |
   |                  Lake bronze (S3)         Realtime consumers  Pseudonymisation
   |                         |                 (safety alerts)    service  |
   |                  Curation jobs                              (only join)|
   |                         v                                             |
   |                  Lake silver/gold (Parquet + table format)            |
   |                         |                                             |
   |         +---------------+----------------+                            |
   |         v               v                v                            |
   |   Insights service  Analytics/ML    Study exports                     |
   |                                                                       |
   |  Device registry + OTA service | LLM gateway (optional)               |
   |  Admin/support console | Observability + security tooling             |
   +-----------------------------------------------------------------------+

   GLOBAL (no personal data):  signed firmware manifests (public), app config,
   routing directory (cell lookup), status page
```

### 3.1 Regional cells (ADR-005, AP-8)

- Each region is an independent cell with its own identity vault, physiology store, lake and keys.
- Users are assigned to a cell at sign-up (by country or choice) and stay there.
- A small global routing directory maps a salted hash of the login identifier to a cell. It holds no profile data. This design choice needs counsel review (open item).
- Firmware manifests and app configuration are global but contain no personal data.
- Cross-cell analytics use aggregated, de-identified outputs only (T4) and need a re-identification review (EA §5.2).

---

## 4. AWS reference architecture (ADR-005)

Reference only; the design uses containers, standard SQL and open table formats to remain portable.

| Concern | AWS reference | Portable alternative |
|---|---|---|
| API entry | API Gateway or ALB + WAF | Any gateway + WAF |
| Compute | ECS Fargate services | Kubernetes |
| Identity | Cognito (managed identity) | Any OIDC provider |
| Relational stores | Aurora PostgreSQL (identity vault, registry, study metadata) | PostgreSQL |
| Stream | Kinesis Data Streams | Kafka or equivalent |
| Lake | S3 with Parquet and an open table format (e.g. Apache Iceberg) | Object store + Iceberg/Delta |
| Query | Athena or a managed warehouse | Trino or equivalent |
| Batch jobs | Glue or containerised Spark/dbt jobs | Spark/dbt |
| Keys | KMS (per-cell keys; envelope encryption) | HSM/KMS |
| Secrets | Secrets Manager | Vault |
| OTA distribution | S3 + CloudFront | Any CDN |
| Observability | CloudWatch plus OpenTelemetry collectors | Prometheus/Grafana |
| IaC | Terraform (or CDK) | Terraform |

Default region: `ap-south-1` (Mumbai) pending D-4 (A-03). A second cell in another region is a Phase 4–5 decision.

At 1,000–10,000 users the stream mostly decouples services; it is not needed for throughput. Costs and managed-service minimums should be checked before choosing between a stream and a simple queue at launch.

---

## 5. Ingestion pipeline

### 5.1 API (illustrative)

| Endpoint | Purpose |
|---|---|
| `POST /v1/batches` | Upload a batch (frames, sessions, check-ins, safety events) with batch ID |
| `GET /v1/insights/weekly` | Weekly summary for the app |
| `GET /v1/devices/{id}/updates` | Signed manifest for firmware or policy |
| `POST /v1/consent` | Record or withdraw a consent purpose |
| `POST /v1/dsr` | Open a data subject request (export, correction, deletion) |
| `GET /v1/dsr/{id}` | Status |
| `POST /v1/study/enrol`, `GET /v1/study/schedule` | Study mode (SDD-06) |

Contract-first with OpenAPI and Protobuf; versioned in the path (EA §6.3).

### 5.2 Flow

```
 App --batch--> API gateway --> Auth --> Consent check (purposes in this batch?)
   --> Validate (schema, signature of device id, integrity checks)
   --> Dedupe (batch id + content hash) --> Ack to app (by batch id)
   --> Event stream --> Bronze (immutable, partitioned by date and cell)
                    --> Safety consumer (SE-xx events -> alerts)
   --> Curation: bronze -> silver (typed, validated, flagged) -> gold (features, daily aggregates)
```

### 5.3 Rules

- A batch is acknowledged only after durable write to the bronze layer.
- A batch with fields outside the user's consent is rejected for those fields, with a clear error; data is not silently dropped.
- Frames carry validity flags; curation preserves "unknown" and never fills with defaults.
- Late data (days old) is accepted and routed to the right partitions.
- Poison messages go to a quarantine location with alerting.

### 5.4 Capacity

Using README §5 assumptions (one 200-byte stored frame per user per 30 s):

| Active users | Frames/s average | Raw GB/day | Raw TB/year | TB/year at 4:1 |
|---|---|---|---|---|
| 1,000 | 33 | 0.58 | 0.21 | 0.05 |
| 10,000 | 333 | 5.76 | 2.10 | 0.53 |
| 100,000 | 3,333 | 57.60 | 21.02 | 5.26 |

Notes:
- Research raw mode (SDD-01 §9.4) is not in these numbers; size it per study (SDD-06).
- Jittered upload scheduling in the app (SDD-02 §5.4) flattens bursts. The burst factor in SDD03-NFR-03 is a planning assumption.
- Storage cost, request cost and transfer cost need real price quotes; none were researched.

---

## 6. Data stores

### 6.1 Identity vault (T0) — relational

| Table | Key fields |
|---|---|
| accounts | account_id, login identifier (encrypted), created_at, cell, status |
| consents | account_id, purpose, version, state, timestamp |
| pseudonym_map | account_id ↔ pseudonym_id (access restricted to the pseudonymisation service only) |
| dsr_requests | id, account_id, type, state, timestamps |
| support_notes | account_id, note (restricted), author, timestamp |

### 6.2 Physiology and self-report (T1…T3)

Keyed only by `pseudonym_id`. No names, emails or phone numbers.

| Dataset | Tier | Storage |
|---|---|---|
| frames (bronze/silver/gold) | T1 | Lake, Parquet with a table format that supports row-level deletes |
| sessions | T1 | Lake and relational summary |
| checkins (including free text) | T2 | Lake with field-level encryption using a per-user data key (§10) |
| ambient context | T3 | Lake |
| safety events | T3 | Relational + lake |
| raw research (PPG/EDA/accelerometer) | T5 | Separate bucket and keys, study-scoped access |

### 6.3 Registry and study metadata — relational

| Table | Key fields |
|---|---|
| devices | device_id, model, hw_rev, firmware_version, pseudonym_id, status |
| firmware_releases | version, channel, manifest, signature info, rollout state |
| policy_bundles | version, channel, signature info, status |
| studies, arms, enrolments | See SDD-06 |

### 6.4 Pseudonymisation service (AP-5, ADR-006)

- Only component that can map account ↔ pseudonym.
- Used for DSR, support and study re-contact.
- Every call logged; just-in-time, approved access for humans.
- Analytics roles cannot call it.

---

## 7. Analytics and insights

| Capability | Design |
|---|---|
| Daily aggregates | Batch job: resting HR, HRV summary, sessions, check-ins, data completeness |
| Weekly insights | Rule-based narratives first ("Your evenings had higher HRV on days you used 3+ sessions"); wellness wording enforced; optional LLM narrator later (doc 04 §5.2) |
| Personal baselines | Rolling windows computed on the phone first; cloud copies for continuity and analysis |
| Product analytics | Aggregated, privacy-tiered events; no T2 content |
| Research analytics | Study exports with blinding rules (SDD-06) |
| ML development | Offline, on de-identified or consented research data; model changes go through the engine's policy governance (SDD-04), never directly to devices |

---

## 8. Device registry and OTA

### 8.1 Release model

| Item | Design |
|---|---|
| Artifacts | Firmware images, policy bundles, content packs |
| Signing | Release key held offline or in an HSM-backed KMS; manifests signed; devices verify (SDD-01 §10) |
| Channels | internal → beta → staged (1% → 10% → 100%) |
| Targeting | By model, hardware revision, region, cohort, and (for studies) study arm, kept compatible with blinding |
| Compatibility | Manifest lists minimum app and engine versions |
| Rollback | Device-side revert; cloud can halt a rollout and publish a fixed version |
| Kill switch | A signed policy bundle can disable actuation channels fleet-wide or by cohort |
| Telemetry | Install success, rollback rate, version distribution, failure reasons (no personal content) |

### 8.2 Safety-driven rollout rules

- Any SE-01…SE-04 event in a staged cohort pauses the rollout automatically and pages on-call.
- Firmware that changes actuation behaviour requires safety-owner approval (EA §12).

---

## 9. Security architecture (summary; controls in SDD-05)

- Per-cell KMS keys, envelope encryption, separate keys for T5.
- Private networking for data stores; no public access to the lake.
- Role-based and attribute-based access control; break-glass with audit.
- WAF, rate limits, abuse detection on public APIs.
- Secrets in a managed secrets service; none in code or images.
- Dependency, container and infrastructure scanning in CI; SBOM per release.
- Audit logs centralised and tamper-evident.

---

## 10. Data subject requests and deletion

| Request | Flow |
|---|---|
| Export | DSR service gathers data for the account through the pseudonymisation service; produces a machine-readable archive; delivered through an authenticated link |
| Correction | Applies to account data and the user's own check-ins; physiological measurements are not "corrected" but can be deleted |
| Deletion | Orchestrator removes T0, then deletes T1…T3 rows by pseudonym through the table format's row-level deletes, crypto-shreds T2 by destroying the user's data key, deregisters devices, and schedules removal from backups by expiry |
| Study data | Per consent terms; some research data may need a documented retention exception; counsel decides |
| Verification | The orchestrator emits a completion report with counts per store; a periodic audit samples deleted pseudonyms |

Design notes:
- Per-user data keys for T2 let deletion be immediate even before compaction of lake files.
- Backups age out on a fixed retention; the policy must state this plainly.
- Derived data (aggregates and trained models) needs a documented position, e.g. whether de-identified aggregates are exempt (counsel).

---

## 11. Observability and operations

| Area | Design |
|---|---|
| Metrics | Ingestion rate and latency, error rates, sync lag, data completeness, OTA progress, deletion queue age |
| Logs | Structured; no T1/T2 content; correlation IDs |
| Traces | OpenTelemetry across API → ingestion → consumers |
| Alerts | SLO burn, safety events, quarantine growth, deletion SLA breach, unusual T0/T2 access |
| On-call | Rotation; runbooks for ingestion failure, bad firmware rollout, key incident, data incident |
| Status | Public status page; in-app status banner |

---

## 12. Resilience and disaster recovery

| Aspect | Design |
|---|---|
| High availability | Multi-AZ within the cell |
| Backups | Point-in-time recovery for relational stores; versioned object storage with lifecycle |
| DR | Restore in a second AZ or region within the same jurisdiction; RPO/RTO per SDD03-NFR-02 |
| Dependency failure | App and device keep working (AP-1); ingestion queues absorb outages |
| Game days | Regular restore tests and failure injection |

---

## 13. Environments and delivery

- Environments: dev, staging, production per cell; no production data in non-production.
- Infrastructure as code with peer review and policy checks.
- CI/CD: build, test, scan, sign, deploy; blue/green or canary deploys.
- Synthetic device and phone simulators exercise the full path in staging.
- Data contracts: schema compatibility checks block incompatible merges.

---

## 14. Cost drivers (no figures)

| Driver | Note |
|---|---|
| Storage | Volume per §5.4; lifecycle tiers; compression |
| Compute | Ingestion services, curation jobs, analytics queries |
| Stream and requests | Small at 1k–10k users; grows with scale |
| Data transfer | OTA images, exports |
| LLM calls | Only if D-7 proceeds; per-call cost and caching |
| Security and compliance tooling | Scanning, audit storage |
| Multi-region | Each extra cell duplicates fixed costs |

Get quotes and run a cost model before committing region and stream choices.

---

## 15. Risks

| ID | Risk | Mitigation |
|---|---|---|
| R-07 | Privacy or residency non-compliance | Cells, split stores, consent enforcement, counsel review |
| R-17 | Incomplete deletion across lake and backups | Row-level deletes, crypto-shredding, backup expiry policy, audits |
| R-18 | Ingestion bursts or poison data | Client jitter, quarantine, autoscaling, schema checks |
| R-19 | Vendor lock-in on managed services | Containers, open table formats, Terraform, standard SQL |
| R-20 | Pseudonym map becomes a re-identification risk | Single service access, logging, JIT approvals |

---

## 16. Open items

- D-4: region and launch geography (affects cell design and routing directory).
- Counsel review of the routing directory and hashed lookups.
- Stream versus queue at launch scale; cost model.
- Retention periods per tier (EA §5.4).
- Position on de-identified aggregates and models after deletion.
