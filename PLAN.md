# Plan: Local Agent

A personal agent that runs on your own machine. Install one package, bring a model, talk to it from the
terminal, a local web page or Telegram. The point is the harness: the loop, security, memory, skills and
progressive disclosure, built so you can see and test every decision.

It's the indie take on OpenClaw: one process, one owner, a few channels, no marketplace, no mobile apps.

## Principles

1. **Useful with nothing but a model.** Memory, files, reminders and web pages work out of the box.
   Accounts (a hosted model, search, apps) are optional add-ons.
2. **Everything is local.** State is plain files plus one SQLite file in `~/.local-agent/`. No telemetry.
3. **Hard rules live in code.** Prompts nudge; the permission gate, taint tracking, egress guard and
   budgets enforce.
4. **One loop.** One agent, one context window. The SDK runs the loop; the harness decides what goes in
   and when to stop.
5. **Everything is an event.** Every step is logged, every state is a query on the log, every run can be
   inspected and replayed.

## Who provides what

| | Who | Notes |
|---|---|---|
| Model | User | OpenAI or Anthropic key (in the OS keychain), or a local model (Ollama, any OpenAI-compatible API) |
| Built-in tools | Us | memory, skills, workspace files, web fetch, schedules, message the owner; shell (off by default, every command approved) |
| Web search | User (optional) | A search API key. Without one, the search tool isn't offered |
| Apps | User | MCP servers: `local-agent mcp add …`. Composio works as one MCP server, never required |
| Skills | Us + user | A starter pack; users add folders or adjust ours |

## What it looks like

```
~/.local-agent/
  config.toml           model, channels, tool settings (no secrets: those are in the keychain)
  state.db              SQLite: event log, sessions, schedules, approvals
  workspace/
    AGENTS.md           standing orders, in every run
    memory/             Napkin vault: profile/ people/ projects/ preferences/ decisions/ routines/
    skills/             the user's own skills and adjustments
    files/              where the file tools can read and write
  logs/
```

```
          ┌───────────────── one process (local-agent daemon) ────────────────┐
terminal ─┤                                                                   │
web UI ───┤  API (127.0.0.1, token)  ──▶  run()  ──▶  harness  ──▶  model     │
Telegram ─┤  scheduler (cron, reminders)        │                             │
          │                                     ├─ gate ─▶ built-in tools     │
          │                                     └─ gate ─▶ MCP servers        │
          └───────────────────────────────────────────────────────────────────┘
```

## What comes from agent-studio

The harness ports almost as is. Its Django ties are shallow: a handful of model queries, `settings` and
`timezone`. They become one `Store` interface backed by SQLite.

| Keep (port) | Rewrite | Drop |
|---|---|---|
| `harness/`: events, views, stop, hooks, loop, render, reminders, disclosure, egress, secrets, replay, inspector | `agent_service.py` (2,500 lines) becomes a small `run()` | Multi-user models, per-user budgets |
| `tool_policy.py`: the gate, taint tracking | Memory storage: DB rows become real markdown files | Composio-specific code, Celery, Redis, Postgres |
| `memory/vault.py`: keyword map, BM25 | Model picker: config, plus a skill can ask for the stronger model | The 27 agent templates |
| `skills/registry.py` + the starter pack | Triggers: a scheduler inside the process | Django REST views |
| Tests: unit, scripted SDK runs, replay; golden evals | Evals: a fake world served as MCP servers | |
| The run inspector UI | | |

The eval finding from agent-studio becomes a feature: a skill can say `model: strong`, so subtle skills
(inbox triage) get the better model while chit-chat stays cheap.

## Stack

- Python 3.12+, packaged with `uv` (`uv tool install local-agent`), MIT license.
- `openai-agents` for the loop. It already speaks MCP and OpenAI-compatible endpoints (Ollama), and
  LiteLLM covers Anthropic.
- `starlette` + `uvicorn` for the local API, `sqlite3` from the standard library, `keyring`, `croniter`,
  `httpx`, `pyyaml`. Telegram by long polling (no public URL, no extra library).
- The React UI (chat, approvals, runs, memory, skills) is built at release time and ships inside the package.

```
src/local_agent/
  core/        the harness: events, views, stop, loop, render, reminders, disclosure, gate, egress, secrets
  store/       Store interface + SQLite
  memory/      the vault on files: keyword map, search, distill
  skills/      registry, tools, library/ (starter pack)
  tools/       files, shell, web, schedule, notify
  mcp/         server config, client, catalog for discovery, gate tiers
  providers/   model config: openai, anthropic, ollama
  channels/    terminal, telegram
  daemon/      app, API, scheduler, service install (launchd, systemd)
  run.py       one run: build context, run the loop, log, deliver
  cli.py       onboard, doctor, chat, daemon, mcp, skills, runs, audit
frontend/      React UI
evals/         golden tasks, fake MCP world
docs/          design notes
```

## Phases

Each phase ends with something you can run and a test suite that passes.

**Phase 0: Skeleton.** `pyproject.toml`, uv, ruff, pytest, GitHub Actions (lint + tests on macOS and
Linux), README, LICENSE.

**Phase 1: The core, without Django.**
- Port the harness modules and the gate. Replace the ORM with a `Store` interface and a SQLite version.
- Port their tests: unit, scripted runs through the real SDK loop, replay of recorded runs.
- Done when: the ported tests pass and nothing imports Django.

**Phase 2: First conversation in the terminal.**
- `config.toml`, model providers (OpenAI, Anthropic, Ollama), keys in the keychain.
- `run()`: context (AGENTS.md, profile, keyword map, skills list), the loop, stop rules, the event log.
- Memory as markdown files (search, read, append, write; distill after a conversation).
- Skills: the starter pack, `skill_load`, adjustments.
- `local-agent chat`: chat in the terminal, approvals as a y/n prompt.
- Done when: "I prefer short replies", quit, start again, and the preference holds; `local-agent runs show <id>`
  prints the timeline.

**Phase 3: Built-in tools.**
- Workspace files (list, read, write, inside `workspace/files/` only).
- Shell: off by default; when on, every command goes through the approval card, and never runs
  unattended.
- Web fetch with the egress guard (now also blocking loopback and the LAN), optional web search.
- Schedules and reminders: "every weekday at 8", "remind me Friday".
- Done when: the tools work, and their security tests pass (path escape, loopback fetch, unapproved shell).

**Phase 4: MCP.**
- `local-agent mcp add/list/remove`, local (stdio) and remote (HTTP) servers, secrets in the keychain and passed
  only to that server.
- Every MCP tool goes through discovery (find, describe, run), so the prompt doesn't grow with servers.
- Gate tiers: a tool marked read-only runs; anything else needs approval until the user marks it
  "always allow". MCP output is third-party content, so taint tracking applies.
- Skills declare what they need ("email", "calendar") and appear once a matching server is connected.
- Done when: with a Gmail MCP server added, the morning brief appears and runs.

**Phase 5: The daemon.**
- One async process: the API, the scheduler, Telegram polling, MCP connections.
- Local API on 127.0.0.1 with a token, plus Origin and Host checks (any website can call localhost).
- Telegram: pairing code for the owner; anyone else's message is third-party content. Approvals as
  buttons.
- The web UI: chat, approvals, run inspector (ported), memory and skills pages.
- Done when: a schedule fires with the terminal closed and the answer arrives in Telegram.

**Phase 6: Install like a product.**
- `uv tool install local-agent` (and `pipx`).
- `local-agent onboard`: model and key, optional search key, Telegram pairing, workspace, background service.
- `local-agent doctor`, `local-agent update`, `local-agent daemon start/stop/logs`.
- Done when: a clean macOS or Linux user goes from nothing to a Telegram reply in under five minutes.

**Phase 7: Security pass.**
- Design note "From EC2 to laptop": what changed in the threat model.
- Tests for the new attacks: DNS rebinding and cross-site requests to the API, an email asking the agent
  to call localhost, an MCP tool description carrying instructions, a skill trying to escape its folder.
- `local-agent audit`: checks the live config against the rules (API bound to loopback, token set, shell off or
  approved, file permissions on `~/.local-agent`).

**Phase 8: Evals and the write-up.**
- Port the golden tasks; the fake inbox, calendar and search become fake MCP servers.
- Run them on hosted and local models and publish the table: "the same harness on gpt-4o, Claude and a
  local model".
- The README tells the story; `docs/` holds one note per mechanism.

## Not now

Other channels (WhatsApp, iMessage, Slack), mobile apps, voice, a skill marketplace, multiple agents,
Windows, a Docker sandbox for the shell. Each is a later decision, not a gap in the design.

## Open questions

1. **Name.** Decided: product "Local Agent", package `local-agent`, import `local_agent`, command
   `local-agent`, state in `~/.local-agent/`. The repo stays `local-agent-harness`.
2. **Shell in v1?** I'd ship it off by default, approval per command. The alternative is to leave it out
   until a sandbox exists.
