# Convergence Certification — Expedition a483d20106f5875d

## Expedition

- **ID:** `a483d20106f5875d`
- **Name:** Document completed expeditions
- **Mission:** Establish governance baseline (`944fe67671d67024`)
- **Goal:** Port the legacy completed expeditions E1-E13 from `.synth_bk/expeditions.json` into the new Synth v2 governance state.

## Convergence Criteria

| Criterion                     | Evidence                                                                                                        | Status |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- | ------ |
| Legacy expeditions identified | `.synth_bk/expeditions.json`                                                                                    | ✅     |
| Replay files ported           | `.synth/replay/bootstrap-e1-0003.json` through `.synth/replay/bootstrap-e13-0027.json` plus `genesis-0001.json` | ✅     |
| Historical record authored    | `proof/legacy-expeditions-e1-e13.md`                                                                            | ✅     |
| Provenance preserved          | Each expedition entry references original completion date, evidence sources, and supporting replay              | ✅     |

## Divergence Assessment

- No conflicting claims introduced.
- Legacy E1-E13 status (`completed`) preserved as historical record.
- Active expeditions (E14-E20) are intentionally excluded; they will be recreated under expedition `5f607c37d314268a`.

## Operator Attestation

This expedition has converged: the historical record is complete, evidence is
accessible, and the port does not alter active governance decisions.
