# Tasks

Status: todo / sent / done (worker reports) / checked (coordinator verified). Phases refer to PLAN.md.

## Site (branch `site`, retired; worker and worktree removed 2026-10-25)

| Task | Owner | Status | Commit |
|---|---|---|---|
| Landing page: section list and copy for review | site | checked | (approved by owner, fixes sent) |
| Landing page: build | site | checked | ef41bee |
| Landing page: smaller hero photo | site | checked | 2cd4766 |
| Merge `site` into `main` | coordinator | checked | 65a80c7 |
| CI job: build + lint site/ | harness | checked | cc0276e |

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
| config.toml, providers (OpenAI, Anthropic, Ollama), keychain | harness | checked | 6a2bb9d |
| `run()`: context, loop, stop rules, event log | harness | checked | 4b9f783, 6a2bb9d |
| Memory as markdown files, distill | harness | checked | 60fa2c6 |
| Skills: starter pack, `skill_load`, adjustments | harness | checked | 60fa2c6, 6a2bb9d |
| `local-agent chat`, `local-agent runs show` | harness | checked | 6a2bb9d |
| From Phase 1: compaction, inspector, record_runs, run tests on real `run()` | harness | checked | 6a2bb9d |
| Docs and README for Phase 2 | harness | checked | 9ef1792 |

## Phase 3: Built-in tools

| Task | Owner | Status | Commit |
|---|---|---|---|
| LiteLLM as a core dependency (owner decision) | harness | checked | 6050fa3 |
| Workspace files, confined to workspace/files/ | harness | checked | bb5f494 |
| Shell: off by default, approval per command, never unattended | harness | checked | bb5f494 |
| Web fetch through the egress guard (loopback + LAN blocked), web search (SerpAPI) | harness | checked | bb5f494 |
| Schedules and reminders: tool, store, due(), `schedules list/rm` | harness | checked | bb5f494 |
| Security tests and docs notes | harness | checked | bb5f494, 40b9378 |

## Phase 4: MCP

| Task | Owner | Status | Commit |
|---|---|---|---|
| `mcp add/list/remove`, stdio + HTTP, secrets per server in the keychain | harness | checked | ddcc7aa |
| Discovery (find, describe, run) for MCP tools | harness | checked | ddcc7aa |
| Gate tiers: read-only runs, else approval until "always allow"; taint | harness | checked | 42c26e3, ddcc7aa |
| Skills appear when a server provides what they need | harness | checked | 5763ade, ddcc7aa |
| End to end with a fake Gmail server; docs/mcp.md | harness | checked | ddcc7aa, 85743d6 |

## Phase 5: The daemon

| Task | Owner | Status | Commit |
|---|---|---|---|
| API contract, docs/api.md (first, forwarded to frontend) | harness | checked | c010e5d |
| `local-agent daemon`: API on 127.0.0.1 with token, Origin and Host checks | harness | checked | 0e1ed2c, b75a72b |
| Scheduler firing schedules unattended; notify tool; background distill | harness | checked | b75a72b |
| Telegram (fake in tests): pairing, strangers third-party, approval buttons | harness | checked | b75a72b, 354a4b3 |
| Web UI in frontend/: chat, approvals, runs inspector, memory, skills, schedules, apps | frontend | checked | 446c2d7 |
| API contract v1.1: approvals status=all, run_id on messages, doc fixes | harness | checked | 85f50cb |
| UI: switch to v1.1 | frontend | checked | 2fb0a0e |
| Live check: UI served by the daemon against the real API | coordinator | checked | (one copy fix sent) |
| Telegram ignores strangers by default, with a setting (owner decision) | harness | checked | fcf25b9 |
| UI wording: today's Telegram commands | frontend | checked | d900572 |
| Merge `frontend` into main; retire the frontend worker | coordinator | checked | f1e7f31 |

## Phase 6: Install like a product

| Task | Owner | Status | Commit |
|---|---|---|---|
| Release build: UI into the wheel; CI builds UI + wheel | harness | checked | 948d6d3, 3b3a967 |
| `uv tool install` / `pipx install` proven in a throwaway tool dir | harness | checked | fcfcee6 (merge) |
| `local-agent onboard` (model, keys, Telegram, workspace, service) | harness | checked | 96adfa0 |
| `daemon start/stop/status/logs`, launchd and systemd user service | harness | checked | 96adfa0 |
| `local-agent doctor`, `local-agent update` | harness | checked | 96adfa0 |
| Real 5-minute check: nothing to a Telegram reply (needs owner's key and bot) | owner | todo | |

## Phases 7–8

Not started. Broken into tasks when Phase 6 is checked.

## Tooling

| Task | Owner | Status | Commit |
|---|---|---|---|
| Agent dashboard (~/Projects/agent-dashboard) | dashboard | checked | 2fc034a (agent-dashboard repo) |
| Multi-project kit: shared ~/agent-kit, per-project notes, dashboard grouped by project (after the dashboard) | — | parked | |

## Ideas (not scheduled)

- Run inspector UI in `frontend/` (site worker): port agent-studio's inspector to React and show a run's
  timeline from the recorded runs in `tests/core/runs/`. Can start before Phase 5; the owner chose to wait.

## Phase 9: closing the gap (OpenClaw, Hermes)

Plan approved 2026-10-29: 3 workers at a time. Wave 0 seams; wave 1 security, efficiency, reach; wave 2 capabilities,
evals, then sandbox (optional, owner asked first). Owner decisions: Docker-only sandbox, never unattended; WhatsApp
options note only; tailscale serve; two judges (gpt-4o + Claude); heartbeat never writes.

| Task | Owner | Status | Commit |
|---|---|---|---|
| Seams: model_for, run() options, marked blocks, namespaced migrations, periodic hook | seams | checked | e385534 |
| Contract notes (security, efficiency, reach, capabilities, evals) | each worker | todo | |
| Owner decisions batch (sandbox, WhatsApp, remote access, judge, heartbeat writes) | owner | checked | (2026-10-29) |
| S1 Review queue | security | todo | |
| S2 Third-party memory writes go to review (builds on the notes' trust labels) | security | todo | |
| S3 MCP tool pinning (hash at approval, re-ask on change, no loosening) | security | todo | |
| S5 Audit rules (pinning, review queue, remote access; sandbox when it lands) | security | todo | |
| E1 Token breakdown (runs tokens) on scripted runs; the Claude/gpt-4o gap waits for paid logs | efficiency | todo | |
| E2 Prompt caching: stable prefix, cache_control, cache tokens in events and budgets | efficiency | todo | |
| E3 Model per purpose ([models] config) | efficiency | todo | |
| E4 Spill big tool output to files (redacted, taint kept) | efficiency | todo | |
| R1 Channel interface out of Telegram (no behavior change) | reach | todo | |
| R2 WhatsApp options note (no build this phase) | reach | todo | |
| R3 Remote access via tailscale serve, allowed_hosts | reach | todo | |
| R4 Daemon log rotation | reach | todo | |
| C1 Browser tool behind the egress guard | capabilities | todo | |
| C2 Subagents (delegate): own context, shared budget, taint both ways, depth 1 | capabilities | todo | |
| C3 Skill proposals moved onto the review queue (old routes keep working) | capabilities | todo | |
| C4 Heartbeat: periodic, read-only, quiet hours, off by default | capabilities | todo | |
| V1 Repeated runs (--runs N, pass k/N) | evals | todo | |
| V2 Two judges (gpt-4o + Claude), agreement in the table | evals | todo | |
| V3 Ollama eval path (scripted fake server) | evals | todo | |
| V4 Empty-result reminder + cloudhost regression test | evals | todo | |
| V5 New eval tasks for S2, S3, C1, C2, C4, E4 (R2 after WhatsApp is decided) | evals | todo | |
| S4 Docker sandbox for shell and stdio MCP (optional, owner asked first) | sandbox | todo | |
| Paid eval run with the new table (incl. Ollama column) | owner | todo | |
| README and PLAN update for Phase 9 | PM | todo | |
