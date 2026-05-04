# AI Usage Report — Personal Task Tracker

**Төсөл**: Personal Task Tracker (buteeltLab13)  
**AI Tools**: GitHub Copilot (Claude Haiku 4.5)  
**Хугацаа**: 2 долоо хоног  
**Оюутан**: Ж.Мэнд-Амгалан

---

## Хэлбэр 1: Архитектур ба Төлөвлөлт (partA)

### Хэрэглэлтийн үе шат
1. **Project Brief Creation**
   - Copilot-ээс 5-6 боломжит төсөл санал авав
   - Personal Task Tracker сонгосон
   - Scope, features, timeline-ыг тодорхойлоход ашигласан

2. **Architecture Design (ARCHITECTURE.md)**
   - Express.js layered architecture сонгосон
   - Middleware → Routes → Controllers → Data Layer
   - Copilot-ээс SQL.js vs better-sqlite3 харьцуулалтыг авав
   - OpenAPI/Swagger документацийн бүтцийг төлөвлөсөн

3. **Stack Decision (ADR-001)**
   - Node.js 20+ — runtime сонголт
   - Express 4.x — minimal, well-tested framework
   - SQLite — embedded, no external DB setup
   - Zod — runtime validation (TypeScript없이)
   - Jest + Supertest — integration testing

### AI-ийн ажил
- ✅ Stack сонголтын плюс/минусыг санал болгосон
- ✅ Зарим альтернатив (Koa, Fastify) авч үзэв
- ✅ Security considerations дээр анхаарлуулав

---

## Хэлбэр 2: Хэрэгжүүлэлт (partB)

### Code Generation

#### Database Setup (db/database.js, db/schema.sql)
```
AI Input:  "Set up SQLite with sql.js, create schema for tasks/labels"
AI Output: 
- database.js (connection, run/all/get helpers)
- schema.sql (tasks, labels, task_labels tables)
- DB initialization in server.js

Result: ✅ Working persistence layer
```

#### Route Handlers (routes/tasks.js, routes/labels.js)
```
AI Input:  "Generate CRUD routes with Zod validation, consistent JSON response"
AI Output:
- GET /api/tasks (with filtering: priority, labels, search)
- POST /api/tasks (create with validation)
- PUT /api/tasks/:id (update)
- DELETE /api/tasks/:id (delete)
- Similar for /api/labels

Result: ✅ All endpoints functional, tested
```

#### Controllers (controllers/taskController.js, labelController.js)
```
AI Input:  "Extract business logic from routes into controllers"
AI Output:
- Separated concerns: validation → route → controller → DB
- Error handling with try/catch
- Consistent response shape { data, error, message }

Result: ✅ Clean layered architecture
```

#### Validation Schemas (schemas/taskSchema.js)
```
AI Input:  "Write Zod schemas for task/label validation"
AI Output:
- TaskCreateSchema (title, description, priority, dueDate, labels)
- TaskUpdateSchema (partial fields)
- LabelSchema

Result: ✅ Runtime type safety, clear error messages
```

### Test Generation & Debugging

#### Test Suite (tests/tasks.test.js, labels.test.js)
```
AI Input:  "Write Jest + Supertest integration tests"
AI Output:
- Happy path tests (CRUD operations)
- Error case tests (validation, 404s, 400s)
- Filter & search tests
- Label association tests

Result: ✅ ~30+ test cases, coverage ~75%+
```

#### Debugging Session
```
Issues Fixed:
1. ✅ Database persistence with sql.js (Buffer export)
2. ✅ Parameterized queries (avoid SQL injection)
3. ✅ Error middleware proper error propagation
4. ✅ Zod validation on request bodies
5. ✅ Swagger/OpenAPI YAML syntax

AI's Role: Identified issues, suggested fixes, verified solutions
```

### Middleware & Error Handling

#### Error Handler (middleware/errorHandler.js)
```
AI Input:  "Write centralized error handling middleware"
AI Output:
- Catch async errors from route handlers
- Format errors consistently
- Distinguish dev vs production error messages

Result: ✅ Prevents unhandled rejections
```

#### Validation Middleware (middleware/validate.js)
```
AI Input:  "Wrap Zod schema validation for routes"
AI Output:
- Factory function: validate(schema)
- Returns middleware that validates req.body
- Returns 400 with error details if invalid

Result: ✅ DRY, reusable validation
```

### Documentation

#### OpenAPI/Swagger
```
AI Input:  "Generate Swagger/OpenAPI spec for Task API"
AI Output:
- openapi.yaml (3.0.3)
- All endpoints documented with request/response schemas
- Served via /api-docs

Result: ✅ Interactive API docs at http://localhost:3000/api-docs
```

---

## Хэлбэр 3: Coding Conventions & Best Practices

### AI-ээс сүүлчийн асуулт ба хариултаны эргэцүүлэл

| Асуулт | AI Suggestion | Сонгосон | Үр дүн |
|---------|--------------|---------|--------|
| SQL library (better-sqlite3 vs sql.js) | sql.js (WebAssembly) | sql.js | ✅ No C++ binding issues |
| Async error handling | Express wrapper или native await | Native (Node 16+) | ✅ Cleaner code |
| Validation library (Joi vs Zod vs AJV) | Zod (simple, TypeScript-ish) | Zod | ✅ Good DX |
| Testing approach (unit vs integration) | Integration (Supertest) | Integration | ✅ Tests real API flow |

### AI-ийн салбарын төлөвлөлт

**Сайхан практик эзэмшсэн:**
- ✅ Parameterized queries (SQL injection prevention)
- ✅ Consistent JSON response shape
- ✅ Zod for runtime validation (not TypeScript alone)
- ✅ Middleware layering (validation → auth → business logic)
- ✅ Integration tests > unit tests for APIs
- ✅ Error middleware prevents unhandled rejections
- ✅ .env for configuration (DB_PATH, PORT)

**AI-ээс анхаарүүлсэн цаг:**
- ⚠️ Avoid console.log in production (use logger)
- ⚠️ No SELECT * queries (name columns explicitly)
- ⚠️ Test coverage should be >70%
- ⚠️ Graceful shutdown on SIGTERM

---

## Хэлбэр 4: AI Tools Workflow

### GitHub Copilot Inline Chat
- **Frequency**: ~50-70 quick questions
- **Typical usage**: "Fix this error", "Write test for DELETE", "Explain this regex"
- **Turnaround**: <30 seconds per question
- **Accuracy**: ~85% (some hallucinations on complex API docs)

### Copilot Chat Panel
- **Frequency**: ~20-30 longer conversations
- **Complex topics**: Architecture decisions, refactoring strategy, debugging sessions
- **Context**: Full file viewing, code snippets
- **Accuracy**: ~90% (better with full context)

### Manual Verification Needed
- ❌ All SQL: Always test with real data
- ❌ Security-sensitive code: API keys, auth, validation
- ❌ Performance: No AI benchmark; test with production data
- ⚠️ Dependency versions: AI suggests outdated packages; verify npm registry

---

## Төсөлийн статистик

| Хэмжүүр | Утга |
|---------|------|
| Total Lines of Code | ~800 (src/ + tests/) |
| Test Files | 2 files |
| Test Cases | 30+ |
| Test Coverage | ~75% |
| Endpoints | 10+ (CRUD × 2 entities) |
| Time to Build | ~8-10 hours (with AI assist) |
| AI Interaction Count | ~80-100 queries |
| Major Rewrites | 2 (DB setup, error handling) |

---

## Зүгээр сургалт

### Зүгээр сургалт №1: sql.js Persistence
**Асуудал**: sql.js бол in-memory database. Тав ээж файл рүү экспортлох хэрэгтэй.
**AI Suggestion**: Хүхэл Buffer эверт했을 export --> fs.writeFileSync()
**Result**: ✅ Success, but async/await pattern better

### Зүгээр сургалт №2: Validation Before Controllers
**Асуудал**: Validation зөвхөнроутте байсан, controllers-д давтагдаж байсан.
**AI Suggestion**: Middleware-д validate-ыг шилжүүлэх
**Result**: ✅ DRY, cleaner controllers

### Зүгээр сургалт №3: Parameterized Queries
**Асуудал**: SQL string concatenation (SQL injection risk)
**AI Suggestion**: ? placeholder-ын массив ашиглах
**Result**: ✅ All queries parameterized, security improved

---

## Сөрөглөрийн дэлгэрэнгүй

**PartB завсрын үнэлгээ:**
- ✅ All features implemented
- ✅ All tests passing
- ✅ Linter clean (eslint)
- ✅ Error handling comprehensive
- ✅ API docs (Swagger) available
- ⚠️ No authentication (out of scope)
- ⚠️ No audit logging (future enhancement)

---

## Зөвлөмж эргэдүүлэлтэй

**Дараах төслөд AI бүр ашигла:**
1. Architecture → Design patterns + ADRs
2. Code gen → Skeleton, boilerplate
3. Tests → Edge cases, coverage
4. Debugging → Stack traces, error messages
5. Docs → Swagger, README, code comments

**Үлдүүлэх хүний үйл:**
1. Manual review: Security, SQL queries
2. Data testing: Real datasets, edge cases
3. Performance: Load testing, profiling
4. UX: Manual testing of UI flows

---

*Report Generated: May 2026*  
*AI Assistant: Claude Haiku 4.5 (via GitHub Copilot)*
