# CLAUDE.md — Personal Task Tracker
> This file guides AI assistants working in this repository.
> Keep under 200 lines. Update as the project evolves.

## Project Overview
A RESTful Personal Task Tracker API with a minimal frontend.
Users can create, read, update, and delete tasks with priorities, labels, due dates, and search/filter.

## Tech Stack
- **Runtime:** Node.js 20+
- **Framework:** Express 4.x
- **Database:** SQLite (via `better-sqlite3`)
- **Testing:** Jest + Supertest
- **Validation:** Zod
- **Docs:** Swagger UI (`swagger-ui-express`) + OpenAPI 3.0

## Build & Run Commands
```bash
# Install dependencies
npm install

# Run development server (with auto-reload)
npm run dev

# Run production server
npm start

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint
```

## Project Structure
```
partB/
├── src/
│   ├── app.js          # Express app setup
│   ├── server.js       # Entry point
│   ├── db/
│   │   ├── database.js # SQLite connection
│   │   └── schema.sql  # Table definitions
│   ├── routes/
│   │   ├── tasks.js    # Task CRUD routes
│   │   └── labels.js   # Label routes
│   ├── controllers/
│   │   ├── taskController.js
│   │   └── labelController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validate.js
│   └── schemas/
│       └── taskSchema.js  # Zod schemas
├── tests/
│   ├── tasks.test.js
│   └── labels.test.js
└── openapi.yaml
```

## Coding Conventions
- Use `async/await`, no raw Promise chains
- All route handlers must use try/catch or be wrapped in `asyncHandler`
- Zod validation on all incoming request bodies
- Return consistent JSON: `{ data, error, message }`
- HTTP status codes: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Internal Server Error
- Use `camelCase` for variables/functions, `PascalCase` for classes
- No `var` — use `const`/`let` only
- Max function length: 30 lines. Extract helpers if longer.
- Every function must have a JSDoc comment

## Database Conventions
- Table names: `snake_case` plural (e.g., `tasks`, `task_labels`)
- Always use parameterized queries — never string concatenation in SQL
- Migrations via `schema.sql` — do not alter existing tables, add new migration blocks

## No-Go Zones (Do NOT do these)
- ❌ Do NOT use `eval()` or `Function()` constructor
- ❌ Do NOT concatenate user input directly into SQL strings
- ❌ Do NOT store passwords in plaintext (no auth in this project, but still)
- ❌ Do NOT use `console.log` in production paths — use a logger
- ❌ Do NOT commit `.env` files or `tasks.db`
- ❌ Do NOT use `SELECT *` in production queries — name columns explicitly
- ❌ Do NOT swallow errors silently (no empty catch blocks)
- ❌ Do NOT use `any` types or skip Zod validation on user input

## Environment Variables (.env)
```
PORT=3000
NODE_ENV=development
DB_PATH=./tasks.db
```

## Git Conventions
- Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`
- AI-assisted commits must include: `Co-Authored-By: Claude <noreply@anthropic.com>`
- Branch naming: `feat/task-crud`, `fix/label-delete`, etc.

## Testing Rules
- Every new route must have at least 2 tests (happy path + error case)
- Use `supertest` for integration tests, `jest` for unit tests
- Test file mirrors source: `src/routes/tasks.js` → `tests/tasks.test.js`
- Run tests before every commit

## Security Checklist (run before PR)
- [ ] All inputs validated with Zod
- [ ] No raw SQL string concatenation
- [ ] Error messages don't leak stack traces in production
- [ ] Dependencies checked with `npm audit`