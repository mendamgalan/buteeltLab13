# Бие даалт 13 — AI-Assisted Software Construction

**Хичээл**: F.CSM311 Программ хангамжийн бүтээлт  
**Сэдэв**: Personal Task Tracker  
**Stack**: Node.js + Express + SQLite  
**Оюутан**: Ж.Мэнд-Амгалан

---

## Repository бүтэц

```
bie-daalt-13/
├── README.md           ← Энэ файл
├── CLAUDE.md           ← AI agent зааварчилгаа
├── .claude/commands/   ← Custom slash commands
├── partA/              ← Төлөвлөлт (Plan)
├── partB/              ← Хэрэгжилт (Build)
└── partC/              ← Эргэцүүлэл (Reflect)
```

## Хэсгүүд

| Хэсэг | Агуулга | Статус |
|-------|---------|--------|
| [А — Plan](partA/) | Архитектур, ADR, Stack харьцуулалт | ✅ |
| [Б — Build](partB/) | Эх код, тест, slash commands | 🔄 |
| [В — Reflect](partC/) | AI Usage Report, Self-evaluation | 📋 |

## Хурдан эхлэх

```bash
cd partB
npm install
npm run dev
# → http://localhost:3000
```