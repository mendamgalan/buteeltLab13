# PROJECT.md — Personal Task Tracker

## Сонгосон сэдэв
**2. Personal Task Tracker** — Даалгаврын удирдлагын систем

## Товч тодорхойлолт (Brief)
Хэрэглэгч өдөр тутмын даалгавруудаа удирдах боломжийг олгох RESTful API + minimal web frontend.
Даалгаврыг үүсгэх, засах, устгах, эрэмбэлэх, шүүх, хайх боломжтой.

## Зорилго
- Программ хангамжийн инженерийн AI-assisted workflow-г жижиг бодит проект дээр туршиж эзэмших
- Node.js + Express + SQLite stack-ийг AI-тай хамтран бүтээх
- "Spec → Generate → Review → Integrate" зарчмыг практикт хэрэглэх

## Хамрах хүрээ (Scope)

### Багтах (In Scope)
| Feature | Тодорхойлолт |
|---|---|
| Task CRUD | Даалгавар үүсгэх, харах, засах, устгах |
| Priority | LOW / MEDIUM / HIGH гурван түвшин |
| Due Date | Дуусах огноо тохируулах, хэтэрсэн тэмдэглэх |
| Labels | Нэг даалгаварт олон label (tag) оноох |
| Search & Filter | Гарчгаар хайх, priority/label/status-аар шүүх |

### Багтахгүй (Out of Scope)
- Хэрэглэгчийн бүртгэл / нэвтрэлт (authentication)
- Олон хэрэглэгч / team feature
- File attachment
- Push notification
- Mobile app

## Хэрэглэгчийн ерөнхий урсгал
1. Хэрэглэгч шинэ даалгавар нэмнэ (гарчиг, тайлбар, deadline, priority, label)
2. Бүх даалгаврын жагсаалтаас хайж, шүүнэ
3. Даалгаврыг засна эсвэл done гэж тэмдэглэнэ
4. Дуусгасан буюу хуучин даалгаврыг устгана

## Хугацааны төлөвлөгөө
| Долоо хоног | Хийх зүйл |
|---|---|
| 1-р долоо хоног | А хэсэг: Архитектур, Stack сонголт, CLAUDE.md, ADR |
| 2-р долоо хоног | Б хэсэг: Feature implement, тест, AI session log |
| 2-р долоо хоногийн сүүл | В хэсэг: AI Usage Report, ADR-002, Self-evaluation |