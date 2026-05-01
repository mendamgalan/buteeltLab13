# /commit — Generate Commit Message

Generate a Conventional Commits formatted commit message for staged changes.

## Instructions

Analyze the staged changes (git diff --staged) and generate:

### Format
```
<type>(<scope>): <short description>

<body — what and why, not how>

<footer>
```

### Types
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation only
- `test` — adding/updating tests
- `refactor` — code change (no new feature, no bug fix)
- `chore` — build, dependencies, tooling

### Scopes (this project)
- `task` — task CRUD operations
- `label` — label operations
- `api` — API/routes layer
- `db` — database/models
- `middleware` — middleware
- `frontend` — public/ files
- `test` — test files
- `config` — configuration

### Rules
- Short description: max 72 chars, imperative mood ("add" not "added")
- Body: explain WHY the change was made
- If AI assisted: add footer `Co-Authored-By: Claude <noreply@anthropic.com>`

## Example Output
```
feat(task): add priority filtering to GET /api/tasks

Previously all tasks were returned regardless of priority.
Added query parameter ?priority=HIGH|MEDIUM|LOW to allow
clients to filter tasks efficiently at the API level.

Co-Authored-By: Claude <noreply@anthropic.com>
```