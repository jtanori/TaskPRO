# AGENTS.md — TaskPRO (SYNTH-governed)

> **AI Operator Contract — Read before modifying this repository.**
>
> This file is a derived projection of the SYNTH governance state in `.synth/`.
> It is regenerable via `synth project AGENTS.md`. The canonical project
> knowledge lives in `knowledge/`; the machine-readable governance state lives in
> `.synth/data/`. If this file disagrees with either, it is stale — regenerate it.

---

## Pre-flight checkpoint

Run this checkpoint at the start of every agent session and before every
implementation action:

1. `synth status` — confirm the project phase and any active expedition.
2. `synth explain replay` — confirm `consistent` is `true`.
3. `synth checkpoint` — confirm an expedition is at `executing` status.
4. Confirm the intended file changes are within the scope of that executing
   expedition.
5. Only then write code or state.

If any step fails, stop and ask the operator for the next step.

---

## Repository status

- **Phase:** executing
- **Active Mission:** `c545dd875a94d8ca` — TaskPRO continuous development
- **Executing Expedition:** `12008eef8dbd95d6` — Fix mobile runtime defects
- **Governance version:** Synth v2.1
- **Legacy archive:** Removed. The previous Synth v1 state in `.synth_bk/`
  was archived out of band and removed during the Synth v2 re-bootstrap.
- **Mission:** Synthesize the TaskPRO platform from canonical knowledge into a
  TurboRepo monorepo — Expo/React Native mobile app (customer + technician)
  with Supabase backend — delivered in BUILD-001 phase order.

---

## Rules for agents working in this repository

1. **`knowledge/` is authored and immutable.** Do not edit, rename, normalize,
   or reformat anything under it without explicit human approval.
2. **All governance mutations go through the SYNTH CLI.** Use `synth mission`,
   `synth expedition`, `synth evidence`, `synth checkpoint`, etc. Never call SDK
   domain functions directly for state mutations.
3. **Never hand-edit derived state.** Do not modify `.synth/data/canonical-state.json`,
   `.synth/data/event-log.jsonl`, `.synth/data/decisions.jsonl`, or this
   `AGENTS.md` file directly.
4. **Do not invent knowledge.** If a decision is not derivable from `knowledge/`,
   capture it as a new Mission/Expedition or open item through the CLI — never
   resolve it silently in code comments or docs.
5. **Work only inside executing expeditions.** Before changing source code,
   confirm an expedition is `executing` and that the changes are within its
   scope.
6. **Do not run the full governance pipeline.** Agents run targeted validation
   only (`synth validate`). The operator runs `npm run govern` before merge.
7. **Do not touch legacy `.synth_bk/`.** It is an archive of the old Synth v1
   installation. Do not copy events, snapshots, or state from it into `.synth/`.
8. **Shell commands are RTK-optimized** per user skill configuration when
   available.

---

## Protected Assets

The following assets SHALL NOT be modified by agent work in this repository:

- Mission Studio
- Genesis
- Replay
- ExecutionGate
- Event Model
- Capability Model
- Constitutional Baseline
- Public Vocabulary (Mission, Expedition, Evidence, Plan, Event, State, Replay)

Any change to these assets requires an Architecture Expedition and a new ADR.

---

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
COMP-001.md.txt embeds NAV-001.

---

## Expedition order (legacy reference from `.synth_bk/`)

E1 Foundation & toolchain ✅ → E2 Design tokens & theme ✅ → E3 UI library ✅ → E4 Domain & contracts ✅ →
E5 Application shell ✅ → E6 Identity & discovery slice ✅ → E7 Booking lifecycle ✅ →
E8 Communication ✅ → E9 Marketplace ✅ → E10 Trust & maturity ✅ →
E11 Environment & configuration ✅ → E12 Build profiles & local artifacts ✅ → E13 GitHub Actions CI ✅ →
E14 Google Play Internal Testing ⏸ → E15 Staging Environment ⏸ → E16 Production Releases ⏸ →
E17 OTA Updates ⏸ → E18 Observability 🔄 → E19 End-to-End Testing ⏸ → E20 Release Automation ⏸.

---

## Active work

- **Expedition `13ab9c79dcf6552c` — Fix mobile runtime defects**
  - Resolve runtime errors preventing the mobile app from starting locally.
  - Scope: React/react-native-renderer version mismatch, missing
    PlatformConstants TurboModule, missing Supabase URL, StyleSheet.create
    failure in Typography.tsx, and ReactNative renderer 'default' undefined
    errors.

---

## Open governance items (resolve explicitly, never silently)

None.

## Resolved governance items

- **R1** — Booking state-machine vocabulary conflict (FLOW-001 vs DOM-001).
  Resolved: E4 canonical state machine adopted.
- **R2** — `knowledge/Docs/DS-05.md:1` stray character in header. Resolved.
- **R3** — DEV-001 React Navigation text: superseded by registry.
- **R4** — DS filename ↔ canonical ID mismatch: resolved by registry.
- **R5** — API-002.md.txt header collision: resolved by registry normalization.
- **D1** — i18n library: resolved; i18next adopted in E6.
- **D2** — Payment gateway sequencing: resolved; Stripe Connect Express first.

---

## Contract Provenance

- **Project:** TaskPRO
- **Governance version:** 2.1
- **Generated:** 2026-08-03
- **Command:** `synth project AGENTS.md`

This file is derived. Regenerate it with `synth project AGENTS.md` after
significant governance changes.
