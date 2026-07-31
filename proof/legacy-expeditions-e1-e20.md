# Legacy Synth v1 Expeditions Archive — E1–E20

> Governed evidence for mission `3efa0a0c5609afb5` — _Establish governance baseline and archive legacy Synth v1 state_.

## Summary

The previous Synth v1 governance state was archived by renaming `.synth` to
`.synth_bk` and bootstrapping a clean Synth v2 project. This document records
the historical expeditions from the v1 archive so the v2 baseline retains
lineage without importing stale events or recreating live expeditions for work
that was already completed or registered under the prior governance state.

## Archive Location

- **Legacy expeditions registry:** `.synth_bk/expeditions.json`
- **Legacy replay files:** `.synth_bk/replay/`
- **Legacy state:** `.synth_bk/state.json`
- **Legacy evidence registry:** `.synth_bk/evidence.json`

## Completed Expeditions (E1–E13)

| ID  | Name                                | Completed At         | Supporting Replay                          |
| --- | ----------------------------------- | -------------------- | ------------------------------------------ |
| E1  | Foundation & toolchain              | 2026-07-16T21:57:45Z | `.synth_bk/replay/bootstrap-e1-0003.json`  |
| E2  | Design tokens & theme               | 2026-07-16T22:42:23Z | `.synth_bk/replay/bootstrap-e2-0005.json`  |
| E3  | UI component library + Storybook    | 2026-07-17T01:03:38Z | `.synth_bk/replay/bootstrap-e3-0007.json`  |
| E4  | Domain, types & contracts           | 2026-07-17T02:26:17Z | `.synth_bk/replay/bootstrap-e4-0009.json`  |
| E5  | Application shell                   | 2026-07-17T03:22:51Z | `.synth_bk/replay/bootstrap-e5-0011.json`  |
| E6  | Identity & discovery vertical slice | 2026-07-17T05:03:13Z | `.synth_bk/replay/bootstrap-e6-0013.json`  |
| E7  | Booking & task lifecycle            | 2026-07-17T06:43:21Z | `.synth_bk/replay/bootstrap-e7-0016.json`  |
| E8  | Communication layer                 | 2026-07-17T14:02:15Z | `.synth_bk/replay/bootstrap-e8-0018.json`  |
| E9  | Marketplace expansion               | 2026-07-17T22:29:47Z | `.synth_bk/replay/bootstrap-e9-0021.json`  |
| E10 | Trust & platform maturity           | 2026-07-18T01:44:02Z | `.synth_bk/replay/bootstrap-e10-0023.json` |
| E11 | Environment & Configuration         | 2026-07-18T03:06:00Z | `.synth_bk/replay/bootstrap-e11-0025.json` |
| E12 | Build Profiles & Local Artifacts    | 2026-07-18T03:57:05Z | `.synth_bk/replay/bootstrap-e12-0026.json` |
| E13 | GitHub Actions CI                   | 2026-07-18T04:16:13Z | `.synth_bk/replay/bootstrap-e13-0027.json` |

## Registered / Pending Expeditions (E14–E20)

These expeditions were registered under Synth v1 but not started. They are
preserved here as a historical backlog. Future work should create new Synth v2
expeditions when the corresponding capability is needed, rather than importing
these records as live state.

| ID  | Name                         | Status      | Depends On              |
| --- | ---------------------------- | ----------- | ----------------------- |
| E14 | Google Play Internal Testing | registered  | E13                     |
| E15 | Staging Environment          | registered  | E13                     |
| E16 | Production Releases          | registered  | E14, E15                |
| E17 | OTA Updates                  | registered  | E13                     |
| E18 | Observability                | in_progress | E13                     |
| E19 | End-to-End Testing           | registered  | E13                     |
| E20 | Release Automation           | registered  | E14, E16, E17, E18, E19 |

## Porting Decision

- **No live expeditions were created** for E1–E20 in the new Synth v2 state.
- **No v1 events were imported** into the v2 event log.
- The legacy archive remains available at `.synth_bk/` for reference, audit,
  and manual recovery if needed.
- This document is the canonical v2 reference to the historical work.
