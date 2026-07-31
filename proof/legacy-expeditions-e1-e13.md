# Legacy Completed Expeditions E1–E13

> Governed evidence for expedition `a483d20106f5875d` — _Document completed expeditions_.
> Source: `.synth_bk/expeditions.json` (Synth v1 governance state).
> Ported to Synth v2 on 2026-07-30.

## Summary

The following expeditions were completed under the previous Synth v1 governance
state. They are preserved here as historical record so the new Synth v2 state
retains lineage for the work already delivered.

| ID  | Name                                | Completed At         | Supporting Replay                       |
| --- | ----------------------------------- | -------------------- | --------------------------------------- |
| E1  | Foundation & toolchain              | 2026-07-16T21:57:45Z | `.synth/replay/bootstrap-e1-0003.json`  |
| E2  | Design tokens & theme               | 2026-07-16T22:42:23Z | `.synth/replay/bootstrap-e2-0005.json`  |
| E3  | UI component library + Storybook    | 2026-07-17T01:03:38Z | `.synth/replay/bootstrap-e3-0007.json`  |
| E4  | Domain, types & contracts           | 2026-07-17T02:26:17Z | `.synth/replay/bootstrap-e4-0009.json`  |
| E5  | Application shell                   | 2026-07-17T03:22:51Z | `.synth/replay/bootstrap-e5-0011.json`  |
| E6  | Identity & discovery vertical slice | 2026-07-17T05:03:13Z | `.synth/replay/bootstrap-e6-0013.json`  |
| E7  | Booking & task lifecycle            | 2026-07-17T06:43:21Z | `.synth/replay/bootstrap-e7-0016.json`  |
| E8  | Communication layer                 | 2026-07-17T14:02:15Z | `.synth/replay/bootstrap-e8-0018.json`  |
| E9  | Marketplace expansion               | 2026-07-17T22:29:47Z | `.synth/replay/bootstrap-e9-0021.json`  |
| E10 | Trust & platform maturity           | 2026-07-18T01:44:02Z | `.synth/replay/bootstrap-e10-0023.json` |
| E11 | Environment & Configuration         | 2026-07-18T03:06:00Z | `.synth/replay/bootstrap-e11-0025.json` |
| E12 | Build Profiles & Local Artifacts    | 2026-07-18T03:57:05Z | `.synth/replay/bootstrap-e12-0026.json` |
| E13 | GitHub Actions CI                   | 2026-07-18T04:16:13Z | `.synth/replay/bootstrap-e13-0027.json` |

## Evidence Sources

- `.synth_bk/expeditions.json`
- `.synth_bk/replay/bootstrap-e1-0003.json` through `.synth_bk/replay/bootstrap-e13-0027.json`
- `.synth_bk/replay/genesis-0001.json`

## Transformation Summary

- E1–E10 delivered the BUILD-001 product implementation (mobile app + backend
  contracts + UI library + domain layer).
- E11–E13 delivered the first BUILD-002 release-engineering slice (environment
  config, EAS build profiles, GitHub Actions CI).

## Porting Notes

- Replay files were copied from `.synth_bk/replay/` into `.synth/replay/`.
- This markdown record was placed in `proof/legacy-expeditions-e1-e13.md`.
- The legacy expeditions are recorded as **historical evidence**, not as active
  Synth v2 Expeditions, because they were completed under the prior governance
  state.
