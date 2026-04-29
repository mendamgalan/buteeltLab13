# AI Planning Session Log — partA

**Огноо:** 2025-01-01  
**Хэрэгсэл:** Claude (claude.ai)  
**Зорилго:** Stack сонголт, архитектур, CLAUDE.md, ADR-001 бэлдэх

---

## Session 1: Stack Харьцуулалт

**Асуусан (товчилсон):**
> "F.CSM311 Бие даалт 13-д Personal Task Tracker хийх гэж байна. Node.js+Express, Python+FastAPI, Python+Flask гурвыг харьцуул. AI workflow (Claude Code) чухал. 2 долоо хоног, нэг хүн. SQLite ашиглана."

**Claude-ийн хариу (товчилсон):**
> 3 stack-ийг харьцуулж үзэхэд AI workflow талаас Node.js+Express давуу байна. Шалтгаан:
> 1. LLM training data-д Express pattern маш элбэг → hallucination бага
> 2. `better-sqlite3` synchronous API нь async complexity нэмэхгүй
> 3. JS full-stack — frontend/backend нэг хэлтэй
> FastAPI-ийн built-in OpenAPI сайн ч энэ хэмжээний проектод overkill.
> **Зөвлөмж: Node.js + Express + SQLite**

**Миний шийдвэр:** Зөвшөөрсөн. Node.js сонгосон.

**Hallucination шалгасан:** Claude анх `sqlite3` package санал болгосон. Гэхдээ `better-sqlite3` нь synchronous, хурдан тул илүү тохиромжтой. Баталгаажуулж засав.

---

## Session 2: Архитектур тодорхойлох

**Асуусан (товчилсон):**
> "Task Tracker API-д layered architecture зур. Task нь title, description, status (pending/in_progress/done), priority (LOW/MEDIUM/HIGH), due_date, labels (олон). Search болон filter ажиллана. Mermaid диаграм үүсг."

**Claude-ийн хариу (товчилсон):**
> Layer: Client → Middleware → Routes → Controllers → DB
> Table: `tasks`, `labels`, `task_labels` (many-to-many)
> Endpoint: 6 task + 3 label
> Mermaid ER + sequence diagram санал болгосон.

**Шийдвэр:** Санал болгосон бүтцийг ARCHITECTURE.md-д ашигласан.  
**Нэмэлт өөрчлөлт:** `PATCH /tasks/:id/status` endpoint нэмсэн — бүтэн PUT шаардлагагүй status update-д.

---

## Session 3: CLAUDE.md тохируулах

**Асуусан (товчилсон):**
> "Express+SQLite+Zod+Jest проектод CLAUDE.md үүсг. Build commands, conventions, no-go zones, ≤200 мөр."

**Claude-ийн хариу (товчилсон):**
> - Build: `npm install`, `npm run dev`, `npm test`
> - Conventions: async/await, Zod validation, consistent JSON response `{data, error, message}`
> - No-go: `eval()`, SQL string concat, `.env` commit, `SELECT *`

**Нэмсэн зүйл:** AI кодын commit-д `Co-Authored-By: Claude` дүрэм нэмсэн. Энэ нь хичээлийн шаардлага учир Claude-ийн анх санал болгоогүй байсан — өөрөө нэмэв.

---

## Session 4: ADR-001 бичих

**Асуусан (товчилсон):**
> "ADR format-аар Node.js stack сонгосон шийдвэрийг бич. Context, Decision, Rationale, Alternatives, Consequences."

**Claude-ийн хариу (товчилсон):**
> ADR template боловсруулж өгсөн. Rationale дотор AI codegen давуу тал, setup хурд, synchronous SQLite-ийн тайлбар байсан.

**Өөрчилсөн:** ADR-д "Баталгаажуулалт" хэсэг нэмсэн — жижиг prototype туршсан тухай. Claude анх энэ хэсгийг оруулаагүй байсан.

---

## Session-ийн дүгнэлт

| Хийсэн зүйл | AI тусалсан эсэх |
|---|---|
| Stack харьцуулалт | ✅ Claude санал болгосон, би баталгаажуулсан |
| Architecture diagram | ✅ Claude Mermaid үүсгэсэн, би өөрчилсөн |
| CLAUDE.md | ✅ Claude draft, би нэмж засав |
| ADR-001 | ✅ Claude template, би нарийвчилсан |
| PROJECT.md | ⚠️ Claude outline, би бичсэн |
| STACK-COMPARISON.md | ✅ AI харьцуулалт, би format хийсэн |

**Гол мэдэгдэл:** Session 1-д Claude `sqlite3` (callback-based) санал болгосон байсан — энэ нь hallucination гэж тооцож болно, учир нь `better-sqlite3` нь sync тул илүү тохиромжтой гэдгийг мэдсэн ч анх хуучин хэвшмэл санал болгосон. ПартC-д дэлгэрэнгүй тайлбарлана.