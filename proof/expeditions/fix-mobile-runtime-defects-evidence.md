# Expedition Evidence — Fix mobile runtime defects

**Expedition:** `13ab9c79dcf6552c`  
**Mission:** `3efa0a0c5609afb5` — Establish governance baseline and archive legacy Synth v1 state

## Defects addressed

The mobile app failed to start locally with these fatal errors:

1. `StyleSheet.create` failure in `packages/ui/src/components/foundation/Typography.tsx`.
2. `TurboModuleRegistry.getEnforcing(...): 'PlatformConstants' could not be found.`
3. `Error: supabaseUrl is required.` from `apps/mobile/src/lib/supabase.ts`.
4. `Incompatible React versions: react 19.1.0 vs react-native-renderer 19.1.4.`
5. `Cannot read property 'default' of undefined` in ReactNative renderer.
6. `ImageViewNativeComponent` rendering error.

## Root causes

- Root `package.json` pinned `react` and `react-dom` to `19.1.0` via `pnpm.overrides`, but the installed `react-native@0.81.6` renderer required `react@19.1.4`.
- `packages/ui/package.json` declared `react@^18.3.1` and `react-native@^0.76.5`, out of sync with the mobile app's React Native 0.81.x / Expo SDK 54 stack.
- `apps/mobile/src/lib/supabase.ts` eagerly created a Supabase client at import time and threw when `EXPO_PUBLIC_SUPABASE_URL` was missing, even in development/local.

## Changes made

### 1. Aligned React versions

**File:** `package.json`

```json
"pnpm": {
  "overrides": {
    "react": "19.1.4",
    "react-dom": "19.1.4",
    ...
  }
}
```

### 2. Aligned `packages/ui` with mobile stack

**File:** `packages/ui/package.json`

- `react`: `^18.3.1` → `^19.1.0`
- `react-native`: `^0.76.5` → `^0.81.6`
- `react-native-safe-area-context`: `^4.14.1` → `^5.6.2`
- `@types/react`: `^18.3.12` → `^19.1.17`
- `react-dom`: `^18.3.1` → `^19.1.0`

### 3. Made Supabase client lazy/conditional

**File:** `apps/mobile/src/lib/supabase.ts`

- Wrapped `createClient` in a factory function.
- In `development`/`local`, if `EXPO_PUBLIC_SUPABASE_URL` or `EXPO_PUBLIC_SUPABASE_ANON_KEY` are missing, log a warning and return a no-op proxy client instead of throwing.
- In `staging`/`production`, missing credentials still throw as before.

### 4. Sentry already conditional

**File:** `apps/mobile/app/_layout.tsx`

- `Sentry.init` and `Sentry.wrap(RootLayout)` are already guarded by `Config.sentry.dsn`, so no change was required.

## Validation

| Check                                     | Result                                         |
| ----------------------------------------- | ---------------------------------------------- |
| `pnpm install`                            | ✅ succeeded                                   |
| `pnpm --filter @taskpro/mobile typecheck` | ✅ passed                                      |
| `pnpm --filter @taskpro/ui typecheck`     | ✅ passed                                      |
| `pnpm --filter @taskpro/mobile lint`      | ✅ passed                                      |
| `pnpm --filter @taskpro/ui lint`          | ✅ passed                                      |
| `pnpm --filter @taskpro/mobile test`      | ✅ 19 passed                                   |
| `pnpm --filter @taskpro/ui test`          | ✅ 26 passed                                   |
| `synth verify`                            | ✅ 5 pass / 0 fail / 1 docs-provenance warning |

## Local Supabase setup

A minimal TaskPRO Supabase instance was started on non-conflicting ports alongside the existing CartaNatal instance.

**File:** `supabase/config.toml`

- `project_id = "TaskPRO"`
- API port: `54331`
- DB port: `54332`
- Disabled non-essential services: `realtime`, `studio`, `local_smtp`, `analytics`, `storage`, `edge_runtime`, `pooler`
- Increased `db.health_timeout` from `2m` to `5m` to allow first-time schema initialization to complete.
- Disabled `experimental.pgdelta` because it depends on `edge_runtime`, which is disabled for the minimal stack.

**Migration fix:** `supabase/migrations/20260716190000_initial_schema.sql:530`

- Replaced `CREATE PUBLICATION IF NOT EXISTS supabase_realtime;` (unsupported syntax) with a conditional `DO $$ ... CREATE PUBLICATION supabase_realtime ... END $$;` block.

**`.env.local` updated:**

```bash
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54331
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH
```

**Verification:** `curl -I http://127.0.0.1:54331/rest/v1/` with the anon key returned `HTTP/1.1 200 OK`.

## Sentry / peer-dependency alignment

**Files:** `apps/mobile/package.json`, `package.json`

- `@sentry/react-native` is installed in `apps/mobile` (not the root).
- Sentry initialization in `apps/mobile/app/_layout.tsx` is already conditional on `Config.sentry.dsn` (`EXPO_PUBLIC_SENTRY_DSN`).
- Root `pnpm.overrides` enforces a single React/React DOM tree:
  - `react`: `19.1.4`
  - `react-dom`: `19.1.4`
  - `@types/react`: `19.1.17`
  - `@types/react-dom`: `19.1.0`
  - `@expo/metro-runtime`: `^6.1.2`
- This satisfies `@sentry/react@10.67.0`'s exact peer dependency on `react@19.1.4` and aligns the renderer with `react-native@0.81.6`.

## Expo SDK upgrade

The mobile app is already on **Expo SDK 54** (`expo@54.0.36`, `expo-router@6.0.24`, etc.). The earlier Expo Go SDK 52 message was from a previous install state.

## AGENTS.md staleness

`AGENTS.md` still references the old Synth v1 replay (`governance-0033.json`) and expedition statuses from before the re-bootstrap. The current synth CLI (`v2.4.1`) does not expose an `AGENTS.md` regeneration capability (`synth docs generate` only writes to `docs/generated/`). It should be regenerated from `.synth/` once the tooling supports it.

## Additional runtime fixes discovered during launch test

### 7. Expo env vars not loaded

**Problem:** After starting the app, the console showed:

```
[supabase] Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY; using no-op client.
```

**Root cause:** Expo loads `.env` files from the Expo project root (`apps/mobile/`), not the monorepo root. The values existed in `/Users/dev/Projects/TaskPRO/.env.local` but were not visible to the bundler.

**Fix:** Created `apps/mobile/.env.local` with the same `EXPO_PUBLIC_*` values. The file is ignored by git via the root `.gitignore` `.env.local` pattern.

**Action required:** Restart the Expo dev server (`Ctrl+C` then `pnpm mobile:dev`) so the new env file is loaded.

### 8. Invalid fake professional ratings

**Problem:** The app crashed during `ContextNavigator` initialization with:

```
DomainError: Rating must be a multiple of 0.5
```

**Root cause:** `FakeReviewService.seedProfessionals()` calls `Rating.create(dto.rating.value)` using values from `FakeServiceCatalogService.PROFESSIONALS`. The DTOs contained `4.8` and `4.9`, but `Rating.PRECISION` is `0.5`.

**Fix:** Updated the fake professional ratings in `apps/mobile/src/features/marketplace/FakeServiceCatalogService.ts`:

- `pro-1`: `4.8` → `4.5`
- `pro-2`: `4.9` → `5.0`

### 9. Invalid Sentry DSN crashed Expo Go

**Problem:** The app loaded in the browser but showed "something went wrong" in Expo Go. Logs showed:

```
Invalid Sentry Dsn: https://your-sentry-dsn
```

**Root cause:** Both `.env.local` files contained the placeholder `EXPO_PUBLIC_SENTRY_DSN=https://your-sentry-dsn` above the real DSN. The placeholder is truthy, so `Sentry.init()` was called with an invalid DSN. Browsers tolerate this as a console error; Expo Go treats it as a fatal crash.

**Fix:**

- Removed the placeholder `EXPO_PUBLIC_SENTRY_DSN=https://your-sentry-dsn` line from both root `.env.local` and `apps/mobile/.env.local`.
- Copied the real DSN into `apps/mobile/.env.local`.
- Added `isValidSentryDsn()` helper in `apps/mobile/app/_layout.tsx` so Sentry only initializes when the DSN is a valid `https://publicKey@host/projectId` URL.

## Validation rerun after additional fixes

| Check                                     | Result                                         |
| ----------------------------------------- | ---------------------------------------------- |
| `pnpm format:check`                       | ✅ passed                                      |
| `pnpm --filter @taskpro/mobile typecheck` | ✅ passed                                      |
| `pnpm --filter @taskpro/mobile lint`      | ✅ passed                                      |
| `pnpm --filter @taskpro/mobile test`      | ✅ 19 passed                                   |
| `synth verify`                            | ✅ 5 pass / 0 fail / 1 docs-provenance warning |

## Remaining user action

- Restart the Expo dev server to pick up `apps/mobile/.env.local`.
- Confirm the app launches without the Supabase or Rating errors.
- If you switch to a hosted Supabase project, update both root `.env.local` and `apps/mobile/.env.local`.
- This expedition remains `executing` until the Convergence Certification CLI is available in synth.
