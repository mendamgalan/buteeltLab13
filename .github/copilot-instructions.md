# Copilot instructions — Personal Task Tracker (buteeltLab13)

Purpose: Short, actionable guidance for GitHub Copilot sessions operating in this repository. Includes build/test/lint commands, high-level architecture, and repository-specific conventions. See CLAUDE.md for fuller AI assistant rules.

## Where to work
- Primary implementation: partB/ (Node.js + Express API)
- Tests and CI targets live under: partB/tests/

## Build / Run / Test / Lint
- Install deps (from repo root):
  cd partB
  npm install

- Development server (auto-reload):
  npm run dev
  # Accessible: http://localhost:3000

- Production start:
  npm start

- Run all tests (Jest + Supertest):
  npm test

- Run tests with coverage:
  npm run test:coverage

- Run the linter (ESLint):
  npm run lint

- Run a single test file (from partB/):
  npm test -- tests/tasks.test.js
  # or: npx jest tests/tasks.test.js

- Run a single test case (by name):
  npm test -- -t "name of test"
  # or: npx jest -t "name of test"

- Swagger UI (API docs):
  http://localhost:3000/api-docs  (when server running)

## High-level architecture (big picture)
- Layered Express API: Client → app middleware → routes → Zod validators → controllers → data layer
- Entry points:
  - partB/src/server.js — process lifecycle, port and graceful shutdown
  - partB/src/app.js — Express app, middleware registration, route mounts
- Routes:
  - /api/tasks — CRUD + filtering/search
  - /api/labels — CRUD
- Validation: Zod schemas under partB/src/schemas; validation wrapper in middleware/validate.js
- Data layer:
  - Uses sql.js (WebAssembly-backed SQLite) via partB/src/db/database.js
  - Database persistence implemented by exporting DB buffer to file path configured via DB_PATH
  - Schema initialization runs SQL from partB/src/db/schema.sql
- Tests: Jest + Supertest exercise the routes (integration-style)

## Key repository conventions (specific, not generic)
- JSON response shape: { data, error, message } — follow this in new handlers
- Zod validation must be used for incoming bodies; use middleware/validate.js
- DB helper exposes: run(sql, params[]), all(sql, params[]), get(sql, params[]). Use positional parameter arrays (bind by index) — avoid string concatenation
- DB schema applied by splitting schema.sql on ';' — be cautious with statements that include semicolons inside SQL literals
- Naming:
  - JS: camelCase for variables and functions
  - DB tables/columns: snake_case and plural table names (tasks, labels, task_labels)
- Max function length ~30 lines. Extract helpers for longer logic
- Do not use console.log in production paths; use logger if available
- Tests mirror source layout (routes → tests/tasks.test.js)
- Commit messages: follow Conventional Commits (feat:, fix:, docs:, test:, chore:)

## Important files to inspect quickly
- partB/src/app.js — middleware and route mounting
- partB/src/server.js — process start/stop
- partB/src/db/database.js — sql.js usage and persistence
- partB/src/routes/tasks.js and controllers/taskController.js — main business logic
- partB/tests/ — example test patterns using supertest
- CLAUDE.md — repository-specific AI assistant rules and additional conventions

## AI assistant notes
- CLAUDE.md is the authoritative AI guidance for this repo; Copilot instructions should be concise and focused on quick tasks
- There is a .claude/ folder with custom slash commands; consider invoking those if present

---

If this file needs adjustments (more implementation detail, CI instructions, or examples for single-test debugging), say which area to expand.
