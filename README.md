# Бие даалт 13 — AI-Assisted Software Construction

**Хичээл**: F.CSM311 Программ хангамжийн бүтээлт  
**Сэдэв**: Personal Task Tracker API  
**Stack**: Node.js 20+ | Express 4.x | SQLite (sql.js) | Zod  
**Оюутан**: Ж.Мэнд-Амгалан

---

## 📁 Repository бүтэц

```
buteeltLab13/
├── README.md                        ← Энэ файл
├── CLAUDE.md                        ← AI agent зааварчилгаа
├── .github/copilot-instructions.md  ← Copilot задача зааварчилгаа
├── .gitignore                       ← Git хасах файлууд
├── partA/                           ← 📋 Төлөвлөлт (Plan)
│   ├── ARCHITECTURE.md              ← Архитектур дизайн
│   ├── STACK-COMPARISON.md          ← Stack харьцуулалт
│   └── adr/                         ← Architecture Decision Records
├── partB/                           ← 🛠️ Хэрэгжилт (Build)
│   ├── src/                         ← Эх код
│   │   ├── app.js                   ← Express appication
│   │   ├── server.js                ← Сервер оролцуулалт
│   │   ├── db/                      ← Мэдээллийн сан
│   │   ├── routes/                  ← API endpoints
│   │   ├── controllers/             ← Бизнес логик
│   │   ├── schemas/                 ← Zod валидаци
│   │   └── middleware/              ← Express middleware
│   ├── tests/                       ← Jest + Supertest тест
│   ├── package.json
│   └── openapi.yaml                 ← Swagger/OpenAPI документ
└── partC/                           ← 📝 Эргэцүүлэл (Reflect)
    ├── AI-USAGE-REPORT.md           ← AI ашигласан тайлан
    ├── SELF-EVALUATION.md           ← Өөрийгөө үнэлэх
    └── ADR-002-ai-implementation-strategy.md
```

## 📊 Төслийн хэсгүүд

| Хэсэг | Зорилго | Төлөв |
|-------|---------|-------|
| **Part A** | Архитектур төлөвлөлт, Stack сонголт | ✅ Дууссан |
| **Part B** | REST API хэрэгжилт, автомат тест | 🔄 Идэвхтэй |
| **Part C** | AI ашигласан тайлан, сүүлийн үнэлгээ | 📋 Төлөвлөгдсөн |

## 🚀 Хурдан эхлэх

### Шаардлага
- Node.js 20+
- npm 9+

### Суулгалт & Эхлүүлэлт

```bash
# Төслийн root-с
cd partB

# Сангуудыг суулгах
npm install

# Хөгжүүлэх сервер (localhost:3000)
npm run dev

# Үйлдвэрийн сервер
npm start

# Тест ажиллуулах
npm test

# ESLint-ээр шалгах
npm run lint
```

### API нэвтрэх
- **REST Endpoints**: http://localhost:3000/api
- **Swagger UI**: http://localhost:3000/api-docs (сервер ажиллаж байхад)

## 📚 Үндсэн файлууд

- **[CLAUDE.md](CLAUDE.md)** — Кодлох заяаа, конвенци, баригдалт
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** — Copilot задлаа
- **[partB/README.md](partB/README.md)** — API бүтээлтийн нарийвчилсан баримт

## 🧪 Тестжүүлэлт

```bash
# Бүх тест ажиллуулах
npm test

# Тест хамрал мэдээ авах
npm run test:coverage

# Нэг файлын тест
npm test -- tests/tasks.test.js

# Тест нэрээр нэг хайх
npm test -- -t "test name"
```

## 📖 API Endpoints

### Tasks
- `GET /api/tasks` — Бүх даалгавар авах
- `POST /api/tasks` — Шинэ даалгавар үүсгэх
- `PUT /api/tasks/:id` — Даалгавар шинэчлэх
- `DELETE /api/tasks/:id` — Даалгавар устгах

### Labels  
- `GET /api/labels` — Бүх шошго авах
- `POST /api/labels` — Шинэ шошго үүсгэх
- `DELETE /api/labels/:id` — Шошго устгах

## 📝 Нэмэлт санамж

- `.env` файл коммит хийхгүй (`.gitignore`-т байна)
- Бүх тестийг коммит өмнө ажиллуулах
- Conventional Commits форматыг ашигла: `feat:`, `fix:`, `test:`, `docs:`
- SQL query-ийн параметрлэлт нь үргэлж параметрлэлт болгодог (нэгдэх шугам нь үл хүлээгдэх)