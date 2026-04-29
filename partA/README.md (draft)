# Personal Task Tracker

> Node.js + Express + SQLite — RESTful task management API with minimal frontend.
> F.CSM311 Бие даалт 13 — AI-Assisted Software Construction

---

## Зорилго
Хэрэглэгч даалгавруудаа priority, label, due date-тэйгээр удирдах боломжтой REST API.

## Features
- ✅ Task CRUD (Create, Read, Update, Delete)
- ✅ Priority: LOW / MEDIUM / HIGH
- ✅ Due date + overdue detection
- ✅ Labels (олон label нэг task-д)
- ✅ Search by title, filter by priority/status/label

## Tech Stack
| Давхарга | Технологи |
|---|---|
| Runtime | Node.js 20+ |
| Framework | Express 4.x |
| Database | SQLite (`better-sqlite3`) |
| Validation | Zod |
| Testing | Jest + Supertest |
| API Docs | Swagger UI + OpenAPI 3.0 |

---

## Хурдан эхлэх (Quick Start)

```bash
# 1. Repository clone хийх
git clone https://github.com/<your-username>/bie-daalt-13.git
cd bie-daalt-13/partB

# 2. Dependencies суулгах
npm install

# 3. Environment тохируулах
cp .env.example .env

# 4. Dev server ажиллуулах
npm run dev
# → Server running at http://localhost:3000
# → API Docs at http://localhost:3000/api-docs
```

---

## API Endpoints

### Tasks
| Method | Endpoint | Тодорхойлолт |
|---|---|---|
| GET | `/api/tasks` | Бүх task жагсаах (filter/search боломжтой) |
| POST | `/api/tasks` | Шинэ task үүсгэх |
| GET | `/api/tasks/:id` | Тодорхой task харах |
| PUT | `/api/tasks/:id` | Task бүрэн засах |
| PATCH | `/api/tasks/:id/status` | Зөвхөн status солих |
| DELETE | `/api/tasks/:id` | Task устгах |

### Labels
| Method | Endpoint | Тодорхойлолт |
|---|---|---|
| GET | `/api/labels` | Бүх label жагсаах |
| POST | `/api/labels` | Шинэ label үүсгэх |
| DELETE | `/api/labels/:id` | Label устгах |

### Query Parameters (`GET /api/tasks`)
```
?search=keyword        # Гарчгаар хайх
?priority=HIGH         # LOW | MEDIUM | HIGH
?status=pending        # pending | in_progress | done
?label=work            # Label нэрээр шүүх
?overdue=true          # Хугацаа хэтэрсэн
```

---

## Тест ажиллуулах

```bash
# Бүх тест
npm test

# Coverage тайлантай
npm run test:coverage

# Тодорхой файл
npm test -- tasks.test.js
```

---

## Проектийн бүтэц

```
partB/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── db/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── schemas/
├── tests/
├── openapi.yaml
└── package.json
```

---

## AI Ашиглалт
Энэ проект нь AI-assisted workflow-ийн хүрээнд хийгдсэн.
Тодорхой мэдээлэл: `partB/ai-sessions/` болон `partC/AI-USAGE-REPORT.md`

---

*F.CSM311 — ШУТИС МХТС — 2025*