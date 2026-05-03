# ADR-001: Stack Сонголт — Node.js + Express + SQLite

| Талбар | Утга |
|---|---|
| **Статус** | Accepted |
| **Огноо** | 2026-05-03 |
| **Шийдвэр гаргасан** | Оюутан Ж.Мэнд-Амгалан + Claude (AI assistant) |

---

## Нөхцөл байдал (Context)

F.CSM311 Бие даалт 13-д Personal Task Tracker хийхээр шийдсэн.
Проект нь дараах шаардлагыг хангасан байх ёстой:

- ≥3 feature (CRUD, priority, label, search)
- REST API + minimal frontend
- Unit test ≥10
- AI-assisted workflow (Claude Code / Cursor)
- 2 долоо хоногийн хугацаа
- Нэг хүний хийх боломжтой хэмжээ

Backend stack сонгохдоо **3 хувилбарыг** харьцуулсан:
1. Node.js + Express + SQLite
2. Python + FastAPI + SQLite
3. Python + Flask + SQLite

---

## Шийдвэр (Decision)

**Node.js 20 + Express 4.x + SQLite (`better-sqlite3`)** ашиглана.

Нэмэлт хэрэгслүүд:
- **Zod** — runtime validation
- **Jest + Supertest** — testing
- **swagger-ui-express** — OpenAPI docs

---

## Үндэслэл (Rationale)

### 1. AI Code Generation чанар
Claude болон бусад LLM-үүд Express/Node.js pattern-ийг маш нарийн мэднэ.
Training data дотор Express app маш элбэг тул:
- Hallucination бага
- Import path алдаа бага
- Pattern нь consistent

FastAPI ч мөн сайн ч Python-ийн async/SQLAlchemy тохиргоо нь
AI-generated кодод илүү алдаа гаргах эрсдэлтэй байсан.

### 2. Setup хурд
```bash
npm init -y
npm install express better-sqlite3 zod
node src/server.js
```
← Энэ л хангалттай. Virtual environment, WSGI server шаардлагагүй.

### 3. JavaScript full-stack давуу тал
Frontend болон backend хоёулаа JS ашигладаг тул:
- Zod schema-г хоёр талд давтах шаардлагагүй
- `fetch()` API browser-д native
- Нэг хэл — нэг cognitive load

### 4. `better-sqlite3` synchronous API
Task tracker нь CPU-bound биш, I/O нь энгийн.
Synchronous SQLite нь async complexity нэмэхгүйгээр хурдан ажилладаг.
(FastAPI-д `aiosqlite` + `async with` шаардлагатай болно.)

### 5. Mature testing ecosystem
`jest` + `supertest` хосолсон нь Express API тестлоход хамгийн тодорхой, жишээ элбэг.

---

## Авч үзсэн хувилбарууд (Alternatives Considered)

### Python + FastAPI
**Давуу:** Built-in OpenAPI/Swagger автомат, async native, Pydantic validation автомат.
**Дутагдал:** Virtual env + uvicorn тохиргоо, SQLAlchemy async complexity, энэ проектод overkill.

### Python + Flask
**Давуу:** Хамгийн энгийн micro-framework, суралцахад хялбар.
**Дутагдал:** Sync-default, OpenAPI тохиргоо нэмэлт, Flask extension-ууд хуучирч байна.

### Node.js + Fastify
**Авч үзсэн ч** — Express-тэй харьцуулахад AI training data бага, жишээ цөөн.
AI workflow-д Express давуу тул татгалзсан.

---

## Үр дагавар (Consequences)

**Эерэг:**
- AI-generated Express код шууд ажиллах магадлал өндөр
- Хурдан prototype, хурдан iterate
- Хялбар SQLite migration (файл хуулах = database хуулах)

**Сөрөг:**
- OpenAPI spec-ийг гараар эсвэл `swagger-jsdoc`-аар үүсгэх шаардлагатай (FastAPI шиг автомат биш)
- Production-д concurrent write асуудал гарч болно (SQLite limitation) — гэхдээ энэ проектод хамаагүй

**Ирээдүйн шийдвэр:**
- Хэрэв concurrent users >100 болвол PostgreSQL руу шилжих (ADR-003 болно)
- TypeScript нэмэх эсэх — хожим тодорхойлно (ADR-004 болно)

---

## Баталгаажуулалт

Stack сонгохын өмнө `better-sqlite3` + `express` хоёрыг жижиг 30 мөр кодоор туршсан.
AI-generated код анхны оролдлогодоо алдаагүй ажиллав → шийдвэр баталгаажсан.