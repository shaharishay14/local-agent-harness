# Tasks

Status: todo / sent / done (worker reports) / checked (coordinator verified). Phases refer to PLAN.md.

## Site (branch `site`)

| Task | Owner | Status | Commit |
|---|---|---|---|
| Landing page: section list and copy for review | site | checked | (approved by owner, fixes sent) |
| Landing page: build | site | sent | |
| Merge `site` into `main` | coordinator | todo | |

## Phase 0: Skeleton

| Task | Owner | Status | Commit |
|---|---|---|---|
| pyproject.toml (uv), ruff, pytest, CI on macOS + Linux, README, LICENSE | harness | checked | 175d2cc |

## Phase 1: The core, without Django

| Task | Owner | Status | Commit |
|---|---|---|---|
| Port harness modules and the gate; `Store` interface + SQLite | harness | sent | |
| Port tests: unit, scripted SDK runs, replay | harness | sent | |

## Phase 2: First conversation in the terminal

| Task | Owner | Status | Commit |
|---|---|---|---|
| config.toml, providers (OpenAI, Anthropic, Ollama), keychain | harness | todo | |
| `run()`: context, loop, stop rules, event log | harness | todo | |
| Memory as markdown files, distill | harness | todo | |
| Skills: starter pack, `skill_load`, adjustments | harness | todo | |
| `local-agent chat`, `local-agent runs show` | harness | todo | |

## Phases 3–8

Not started. Broken into tasks when Phase 2 is checked.
