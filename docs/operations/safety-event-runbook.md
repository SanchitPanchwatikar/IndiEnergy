# Safety Event Triage Runbook

> **Document control:** Version 0.1 | Status: Proposed — operational owner and local escalation paths required | Owner: Safety / support lead (TBD) | Last reviewed: 2026-11-20

This runbook is for receiving and escalating a report of possible injury, device hazard, unsafe behavior, or other product-related safety concern. It is not clinical advice and does not replace local emergency services, legal counsel, regulatory reporting, or an approved study protocol.

## 1. Readiness prerequisites

Before a pilot or production release, name primary and backup safety owners, support channel, coverage hours, local emergency guidance, hardware/vendor contacts, privacy/security contacts, and qualified regulatory/legal escalation. Define and approve response targets for the actual market and team. Do not invent service-level promises in product copy.

## 2. Intake

1. Acknowledge the report promptly through the approved support channel. If the person reports immediate danger, encourage them to contact local emergency services or an appropriate local professional; do not attempt diagnosis or crisis assessment.
2. Gather only information needed to understand and follow up: what happened, when, device/app and firmware version if known, whether the device is still in use, and safe contact preference. Do not solicit unrelated medical history, raw sensor exports, or unnecessary identifiers.
3. Tell the reporter not to continue using a device/function they believe is unsafe while the report is assessed. Do not ask them to reproduce a potentially hazardous condition.
4. Record the report in an access-controlled incident register. Separate safety details from general analytics; restrict access and follow approved retention/deletion rules.

## 3. Triage and containment

The named safety owner assesses severity with qualified hardware/regulatory support. Treat credible injury, burn, electrical/battery issue, unexpected actuator behavior, or repeated device failure as a potential safety issue until reviewed.

Possible containment, selected by the accountable owner:

- Disable a feature or device integration remotely where that is technically safe and approved.
- Pause pilot enrollment, shipment, or rollout; quarantine affected inventory where applicable.
- Disable haptics/output locally through an approved safe control. Never rely on a remote service to stop an actuator if the device needs a local fail-safe.
- Preserve minimum relevant logs/versions and the device for analysis only with consent and a documented chain of custody.
- Escalate promptly to the founder, safety owner, hardware lead, privacy/security owner if data is involved, and qualified counsel/regulatory specialist for market-specific obligations.

Do not delete or alter evidence needed for a safety/security investigation, but apply approved access and retention controls. Record the rationale for containment and who authorized it.

## 4. Investigation and communication

- Reconstruct the event using approved, minimized evidence and the exact device, firmware, app, and adapter versions.
- Determine whether similar reports or affected batches/features exist without exposing user identities.
- Provide factual status updates through the approved owner; avoid assigning cause before evidence exists.
- Consider separate privacy/security incident handling when personal data may have been exposed.
- Consult qualified reviewers on any required external reporting, customer notice, recall/stop-sale, or study notification; this document does not establish legal deadlines.

## 5. Closure and learning

Close only when the accountable safety owner records the evidence reviewed, impact/scope, root-cause confidence or uncertainty, remediation, verification, communication, required reviewer decisions, and residual risk acceptance. Add corrective actions to the tracker, update the hazard log and tests, and re-open the phase/release gate if risk changes. Do not convert the incident into a public efficacy or safety claim.
