# Tasks

Status: todo / sent / done (worker reports) / checked (coordinator verified). Phases refer to PLAN.md.

## Site (branch `site`)

| Task | Owner | Status | Commit |
|---|---|---|---|
| Landing page: section list and copy for review | site | checked | (approved by owner, fixes sent) |
| Landing page: build | site | checked | ef41bee |
| Landing page: smaller hero photo | site | checked | 2cd4766 |
| Merge `site` into `main` | coordinator | todo | |

## Phase 0: Skeleton

| Task | Owner | Status | Commit |
|---|---|---|---|
| pyproject.toml (uv), ruff, pytest, CI on macOS + Linux, README, LICENSE | harness | checked | 175d2cc |

## Phase 1: The core, without Django

| Task | Owner | Status | Commit |
|---|---|---|---|
| Port harness modules and the gate; `Store` interface + SQLite | harness | checked | 097f91b |
| Port tests: unit, scripted SDK runs, replay | harness | checked | 097f91b |
| Design notes in docs/ | harness | checked | fbca3f3 |

## Phase 2: First conversation in the terminal

| Task | Owner | Status | Commit |
|---|---|---|---|
| config.toml, providers (OpenAI, Anthropic, Ollama), keychain | harness | todo | |
| `run()`: context, loop, stop rules, event log | harness | todo | |
| Memory as markdown files, distill | harness | todo | |
| Skills: starter pack, `skill_load`, adjustments | harness | todo | |
| `local-agent chat`, `local-agent runs show` | harness | todo | |
| From Phase 1: compaction, inspector, record_runs, run tests on real `run()` | harness | todo | |

## Phases 3–8

Not started. Broken into tasks when Phase 2 is checked.
