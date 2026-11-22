# ADR-0012: Website and prototype technology baseline

> **Document control:** Version 0.1 | Status: Proposed | Decision owner: Founder / CTO | Approver(s): Founder and technical lead | Date: 2026-11-21

## Related work

- Backlog task IDs: F2.1, F2.2, F2.4, F3.1–F3.4, F4.1–F4.2
- Related solution/enterprise documents: [Enterprise architecture](../architecture/enterprise-architecture.md), [pre-launch experience](../solution-design/01-prelaunch-experience.md), [companion app design](../solution-design/02-companion-app.md)
- Supersedes / superseded by: None. Hosting provider operations remain under the planned ADR-0006.

## Context

The repository had no application code. P1 requires a public site with design tokens, CI, and three content pages. P3–P4 require a phone app and a device adapter. The stack must be the least complex option that covers both, while keeping the site static and data-free until a waitlist is approved.

**Verified:** scaffold created on 2026-11-21 with Next.js 16.4.6, React 19.3.1, TypeScript 5.9, and Tailwind CSS 4.3. The GitHub Actions workflow is **configured** to run `npm ci`, typecheck, lint, and build; those commands passed locally on 2026-11-21, but the workflow has **not yet executed** on the repository (nothing has been pushed), so there is no CI run to cite. No runtime data collection, accounts, database, or third-party scripts are present.

## Decision drivers

- Ship a fast, accessible, static-first site without an operations hire.
- Reuse one design-token system across website and app.
- Keep the waitlist addable later without replatforming.
- Keep sensor data local and the device vendor replaceable.
- Avoid infrastructure with no validated need.

## Options considered

| Option | Benefits | Costs / risks | Evidence or open questions |
|---|---|---|---|
| A. Next.js App Router + TypeScript + Tailwind; Expo/React Native app; local SQLite; typed device adapter | One language and token system across web and app; static pages by default; server route available later for the waitlist | Next.js upgrade cadence; React Native BLE work; slightly larger JS than a pure static site | Scaffold builds and passes checks |
| B. Astro static site + separate native apps | Excellent static performance; minimal JS | Two UI systems and two skill sets; slower app start | No repo evidence for the split |
| C. No-code website builder + separate app | Fastest non-technical launch | Weak version control, accessibility, and claims review; migration likely | Conflicts with CI and review requirements |
| D. WordPress or a CMS-first stack | Familiar editing | Plugin and security surface; unnecessary for three pages | No editorial team or content workflow exists |

## Decision

**Proposed:** Adopt Option A.

| Layer | Choice | Notes |
|---|---|---|
| Website | Next.js App Router, React, TypeScript (strict), Tailwind CSS v4 | Static-first; no client state; no third-party scripts |
| Design tokens | CSS custom properties exposed through Tailwind theme | Shared palette and type scale intended for the app |
| Hosting | Managed edge/static hosting | Provider and region to be confirmed under ADR-0006 before public launch |
| Waitlist (later) | Server-side route plus serverless SQL | Only after F1.7 and privacy review; no client-side database keys |
| Companion app | Expo / React Native + TypeScript | One codebase for iOS and Android |
| App storage | Local SQLite, no account by default | Export and deletion are required features |
| Device | One development kit behind a typed adapter, plus a deterministic simulator | Vendor SDK confined to one module |
| CI | GitHub Actions: `npm ci`, typecheck, lint, build | Configured but not yet executed in CI; no test suite yet; add focused tests with app logic |
| Analytics | None | Requires separate approval and notice |

**Conditions:** hosting selection is not made by this ADR; no secrets in the repository; no analytics or tracking scripts; no demo authentication, OTP, payment, or inventory code; the site must build from a clean checkout with `npm ci`.

## Consequences

### Positive

- Website, app, and tokens share one language and one review path.
- Static pages keep hosting cheap and the privacy surface small.
- A server route remains available for an approved waitlist.
- The CI workflow is in place to block type, lint, and build regressions once changes are pushed.

### Negative / trade-offs

- Next.js and Tailwind major upgrades require periodic maintenance.
- React Native BLE integration carries device-specific debugging cost.
- A framework site is heavier than hand-written HTML for three pages.

### Risks and mitigations

- **Framework upgrade churn:** pin versions, upgrade deliberately, keep CI green.
- **Hosting lock-in:** keep deployment configuration minimal and provider-neutral.
- **Premature backend:** the waitlist route is added only with the approved data design.
- **Device SDK coupling:** adapter interface plus simulator contract tests.
- **Token drift between site and app:** treat the token file as the source of truth and review changes together.

## Approval and evidence

| Reviewer / approver | Decision | Date | Evidence / comments |
|---|---|---|---|
| Founder / business owner | Pending | | |
| CTO / technical lead | Pending | | |
| Security or privacy reviewer | Pending | | Confirm no collection, secrets, or third-party scripts at launch |

## Implementation and verification

- Implementation owner: Web/app engineering
- Acceptance criteria: clean checkout runs `npm ci`, `npm run typecheck`, `npm run lint`, and `npm run build`; pages are static; no personal data is collected; tokens are documented in `app/globals.css`.
- Verification evidence: local `npm ci`, `npm run typecheck`, `npm run lint`, and `npm run build` output from 2026-11-21; preview review against supported viewports. A CI run is **not** yet available — the workflow is configured, not executed.
- Backlog tracker row: F2.4 (checks established); F3.1 (site implementation in progress).

## Revisit triggers

- A waitlist or any server-side data flow is approved.
- Hosting provider, region, or cost changes materially.
- The app requires a capability React Native/Expo cannot provide.
- A framework version falls out of support or a security advisory requires action.
