# BUILD-002 — Platform Delivery & Release Engineering

## Status

In planning.

## Goal

Establish a production-grade delivery pipeline for TaskPRO with multiple environments, automated testing, continuous integration, store deployment, monitoring, and release management.

## Overview

With the product implementation complete, the focus shifts to the machinery that turns commits into testable, deployable releases. This roadmap covers environment management, build automation, CI/CD, store distribution, observability, and end-to-end testing.

## Principles

- **Familiar tooling**: use standard tools any professional mobile team would recognize (Expo, EAS, GitHub Actions, Google Play, PostHog, Sentry, Maestro).
- **Deterministic builds**: the same commit produces the same artifact on any developer machine or CI runner.
- **Environment separation**: development, local, staging, and production are distinct and clearly branded.
- **Automation first**: artifact creation, testing, and distribution are automated; production releases require explicit approval.
- **Local developer experience**: any engineer should be able to produce an installable APK locally without needing store credentials or EAS expertise.

## Workstreams

| ID  | Workstream                       | Outcome                                                              |
| --- | -------------------------------- | -------------------------------------------------------------------- |
| W11 | Environment & Configuration      | Centralized configuration system and feature flags.                  |
| W12 | Build Profiles & Local Artifacts | Local APKs, staging APKs, production AABs, and EAS build profiles.   |
| W13 | GitHub Actions CI                | Lint, typecheck, tests, coverage, builds, and artifact publishing.   |
| W14 | Google Play Internal Testing     | Automatic upload to the Play Console Internal Testing track.         |
| W15 | Staging Environment              | Dedicated staging backend and branded `TaskPRO Staging` application. |
| W16 | Production Releases              | Tagged releases with approval gates and Play Store deployment.       |
| W17 | OTA Updates                      | EAS Update channels for non-native changes.                          |
| W18 | Observability                    | PostHog, Sentry, and performance monitoring integration.             |
| W19 | End-to-End Testing               | Maestro flows integrated into CI.                                    |
| W20 | Release Automation               | Versioning, changelogs, release notes, and artifact retention.       |

## Environments

| Environment   | Purpose                                               | Backend                                   | Artifact              |
| ------------- | ----------------------------------------------------- | ----------------------------------------- | --------------------- |
| `development` | Fast local iteration with Expo Go / dev client        | Fake in-memory services                   | None (Expo Go bundle) |
| `local`       | Installable local testing without backend credentials | Fake in-memory services                   | APK                   |
| `staging`     | QA testing against real staging services              | Staging Supabase, Stripe, PostHog, Sentry | APK                   |
| `production`  | Release candidate for the Play Store                  | Production services                       | AAB                   |

## Developer commands

```bash
# Start the Expo development server
pnpm mobile:dev

# Produce an installable local APK
pnpm mobile:build:local
# Output: dist/taskpro-local.apk

# Produce a staging APK
pnpm mobile:build:staging
# Output: dist/taskpro-staging.apk

# Produce a production AAB
pnpm mobile:build:production
# Output: dist/taskpro-production.aab
```

Future commands:

```bash
pnpm mobile:install      # Build and install on a connected Android device
pnpm mobile:run:local    # Build, install, and launch the local profile
pnpm mobile:build:all    # Build local, staging, and production artifacts
```

## CI/CD pipelines

### `ci.yml`

Runs on every push and pull request:

```text
Checkout
  ↓
Install dependencies
  ↓
Lint
  ↓
Typecheck
  ↓
Tests
  ↓
Coverage
  ↓
Build packages
  ↓
Upload artifacts
```

### `build-local.yml`

Runs on every push to `main`:

```text
Build local APK
  ↓
Upload to GitHub Actions artifacts
```

### `build-staging.yml`

Runs on every push to `main` or `release/*`:

```text
Build staging APK
  ↓
Upload to GitHub Actions artifacts
```

### `play-store-internal.yml`

Runs on every merge to `main`:

```text
Build staging APK / AAB
  ↓
EAS Submit
  ↓
Google Play Internal Testing track
```

### `production.yml`

Triggered only by a Git tag (e.g., `v1.2.3`):

```text
Manual approval
  ↓
Build production AAB
  ↓
Sign
  ↓
EAS Submit
  ↓
Google Play Production track
  ↓
Create GitHub Release
```

### `security.yml`

Scheduled and on pull requests:

```text
Secret scan
  ↓
Dependency audit
  ↓
License check
```

### `performance.yml`

Runs on every pull request:

```text
Bundle size analysis
  ↓
Startup budget check
  ↓
Dependency size report
```

## Deployment providers

The release system abstracts deployment providers behind a common interface so TaskPRO can target multiple distribution channels without changing the release orchestration.

```text
DeploymentProvider
├── GooglePlayProvider
├── AppStoreProvider
├── EASProvider
└── FirebaseDistributionProvider
```

## Observability

Replace the console-only placeholders from BUILD-001 with real providers:

- **Analytics**: PostHog
- **Crash reporting**: Sentry
- **Performance**: Sentry + custom mobile performance budgets

CI validates that DSNs and API keys are present for staging and production.

## End-to-end testing

Use Maestro for deterministic UI flows:

```text
Install app
  ↓
Log in
  ↓
Book a service
  ↓
Complete booking
  ↓
Leave a review
```

Maestro flows run on every pull request and before staging deployments.

## Release governance

Every production release verifies:

- Version bump in `package.json` and app config
- Changelog entry
- Database migration status
- Environment consistency
- Signing configuration
- Artifact integrity

No production release happens from an arbitrary commit or without an explicit tag.

## Completion criteria

- Any developer can run `pnpm mobile:build:local` and receive an installable APK.
- Every push to `main` produces validated artifacts and runs the full test suite.
- Every merge to `main` publishes an internal testing build to Google Play.
- Production releases are triggered only by version tags and require manual approval.
- OTA updates can be deployed for non-native changes without a store submission.
- Maestro E2E flows run in CI and block broken releases.

## Previous roadmap

- [BUILD-001 — Product Implementation Roadmap](./BUILD-001.md)
