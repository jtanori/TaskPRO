# AGENTS.md — TaskPRO (SYNTH-governed)

> **Derived view.** This file is a human-readable projection of the SYNTH governance
> state in `.synth/`. It is regenerable and never authoritative. The canonical
> project knowledge lives in `knowledge/`; the machine-readable governance state
> lives in `.synth/`. If this file disagrees with either, it is stale — regenerate it.

## Repository status

- **Phase:** governed / implementation in progress. Knowledge complete; E1–E9 completed; E10 registered.
- **Genesis:** `.synth/replay/genesis-0001.json` (input snapshot sha256 `2c38853a…`, 119 files).
- **Latest update:** `.synth/replay/governance-0022.json` (E9 completed; D2 payment-gateway-sequencing confidence promoted to HIGH).
- **Mission:** Synthesize the TaskPRO platform from canonical knowledge into a TurboRepo
  monorepo — Expo/React Native mobile app (customer + technician) with Supabase backend —
  delivered in BUILD-001 phase order, each phase a usable vertical slice.

## Rules for agents working in this repository

1. `knowledge/` is **authored and immutable**. Do not edit, rename, normalize, or
   reformat anything under it without explicit human approval (see open item R2).
2. `.synth/` is **governance state**. Assertions must carry provenance
   (`evidence_sources`, `derivation_type`, `confidence`). No anonymous state.
3. **Do not invent knowledge.** If a decision is not derivable from `knowledge/`,
   record it as an open decision in `.synth/state.json` — never resolve it silently.
4. Implementation work happens only inside registered expeditions
   (`.synth/expeditions.json`), in dependency order, respecting gates.
5. Shell commands are RTK-optimized per user skill configuration.

## Canonical authorities (what wins when artifacts disagree)

| Domain             | Authority                                                                             |
| ------------------ | ------------------------------------------------------------------------------------- |
| Technology stack   | TASKPRO-TECH-001 (supersedes DEV-001 on navigation: Expo Router is canonical)         |
| Design system      | TASKPRO-DS-001…005 (v1.0, Approved Architecture; files `knowledge/Docs/DS-01..05.md`) |
| Domain model       | TASKPRO-DOM-001 + DATA-001, persisted via DB-001                                      |
| API contracts      | TASKPRO-API-001 + API-002 (capability contracts, not CRUD)                            |
| Workflow/state     | TASKPRO-FLOW-001 + STATE-002 — **jointly canonical, pending R1**                      |
| Screens/routes     | TASKPRO-UI-001 + SCREEN-001 + NAV-001 (NAV-001 embedded in COMP-001)                  |
| Delivery order     | TASKPRO-BUILD-001                                                                     |
| Security           | TASKPRO-AUTH-001                                                                      |
| Monorepo structure | TASKPRO-MOD-001                                                                       |
| UI ground truth    | `knowledge/UI/**` (90 HTML/PNG assets, per-screen)                                    |

Composite addressing: GAPS-001.md contains FLOW-001, I18N-001, OPS-001, TECH-001;
COMP-001.md.txt embeds NAV-001. Full registry: `.synth/evidence.json`.

## Expedition order

E1 Foundation & toolchain ✅ → E2 Design tokens & theme ✅ → E3 UI library ✅ → E4 Domain & contracts ✅ →
E5 Application shell ✅ → E6 Identity & discovery slice ✅ → E7 Booking lifecycle ✅ →
E8 Communication ✅ → E9 Marketplace ✅ → E10 Trust & maturity (registered).

## Open governance items (resolve explicitly, never silently)

- **R2** — `knowledge/Docs/DS-05.md:1` stray character in header. Approval-gated authored-artifact fix.

## Resolved governance items

- **R1** — Booking state-machine vocabulary conflict (FLOW-001 vs DOM-001). Resolved: E4 canonical state machine adopted.
- **R3** — DEV-001 React Navigation text: superseded by registry (document untouched).
- **R4** — DS filename ↔ canonical ID mismatch: resolved by registry (optional rename approval-gated).
- **R5** — API-002.md.txt header collision: resolved by registry normalization/disambiguation (artifact untouched).
- **D1** — i18n library: resolved; i18next adopted in E6.
- **D2** — Payment gateway sequencing: resolved; Stripe Connect Express first, ratified in governance-0020.
