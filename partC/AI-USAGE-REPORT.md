# AI ашиглалтийн тайлан — Personal Task Tracker

**Төсөл**: Personal Task Tracker (buteeltLab13)
**AI хэрэгслүүд**: GitHub Copilot, Claude
**Хугацаа**: 2 долоо хоног
**Оюутан**: Ж. Мэнд-Амгалан

---

## I. Архитектур ба төлөвлөлт (Part A)

1) Project brief боловсруулах
- Copilot-оос хэд хэдэн төсөл саналыг авч, Personal Task Tracker-ийг сонгосон.
- Төслийн цар хүрээ, шаардлага, гол функцууд болон хугацааг тодорхойлсон.

2) Архитектурын шийдэл (ARCHITECTURE.md)
- Express дээр суурилсан layered архитектур (middleware → routes → controllers → data layer).
- SQL.js болон better-sqlite3-ийн давуу/сул талыг харьцуулсан.
- OpenAPI/Swagger-д зориулсан документацийн бүтэц төлөвлөсөн.

3) Stack шийдвэр (ADR-001)
- Node.js 20+, Express 4.x, SQLite (sql.js) хувилбаруудыг ашигласан.
- Zod валидаци, Jest + Supertest тестүүдэд ашигласан.

AI-гийн үүрэг: Stack сонголт, альтернатив саналууд, аюулгүй байдлын анхааруулга өгсөн.

---

## II. Хэрэгжүүлэлт (Part B)

### Code generation (гол хэсгүүд)

- Database: `db/database.js` болон `db/schema.sql` файлуудыг AI тусламжтай үүсгэж, persistence логик бий болсон.
- Route handlers: `routes/tasks.js`, `routes/labels.js` — CRUD, шүүлт/хайлтын боломжуудтай.
- Controllers: Бизнес логикыг тусад нь салгасан, алдааг барих try/catch ашигласан.
- Validation: `schemas/taskSchema.js` — Zod схемүүд (create/update/label).

### Тест ба дебаг

- Jest + Supertest ашиглан ~30+ тест бичигдсэн (happy path + алдааны тохиолдлууд), хамрах хүрээ ~75%.
- Гол засварууд: sql.js persistence (Buffer export), parameterized queries, төвлөрсөн error middleware, Zod validation, Swagger YAML засвар.

---

## III. Мэдлэг, туршлага, сайн дадал

- Parameterized queries ашигласнаар SQL injection эрсдлийг бууруулсан.
- Нэг хэлбэрийн JSON хариу (`{ data, error, message }`) баримталсан.
- Validation-ийг middleware-д шилжүүлж, controllers-ыг цэвэрлэсэн.

Анхааруулга:
- `console.log` production-д ашиглахгүй байх; логер ашиглах.
- `SELECT *`-аас зайлсхийж, баганын нэр тодорхой заавал бичих.

---

## IV. AI Tools workflow (багц статистик)

- Copilot inline: богино асуултууд (~50–70), түргэн санал өгдөг.
- Copilot Chat: урт ярилцлага (~20–30), refactor, архитектур, дебаг-д их тусалсан.
- Claude: стратеги, тайлбар, нарийвчилсан зөвлөмж өгсөн.

Бусад:
- Код ба SQL-ыг дангаар нь итгэхгүй, заавал реаль дата дээр шалгах хэрэгтэй.

---

## V. Төслийн статистик (ойролцоогоор)

- Lines of code: ~800
- Test cases: 30+
- Test coverage: ~75%
- Endpoints: 10+
- AI interaction: ~80–100 удаа

---

## VI. Сурсан зүйлс (Lessons)

1. `sql.js` нь in-memory тул persistence хийхдээ DB buffer-г файлд бичих шаардлагатай.
2. Validation-ийг middleware-д шилжүүлэх нь кодыг илүү цэвэр болгодог.
3. AI-гийн саналууд ихэвчлэн сайн боловч edge-case болон performance-г хүн шалгах ёстой.

---

## VII. Дүгнэлт ба зөвлөмж

- AI нь хурдан boilerplate, тест, документац үүсгэхэд маш үр дүнтэй.
- Гэхдээ production-д оруулахын өмнө хүн гардан шинжилгээ, security audit хийх шаардлагатай.

*Тайлан боловсруулсан: May 2026*

