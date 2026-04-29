# ARCHITECTURE.md — Personal Task Tracker

## Системийн тойм

REST API + SQLite хадгалалт + minimal HTML frontend. Layered architecture ашиглана:
**Client → Routes → Controllers → DB**.

---

## 1. Давхаргын диаграм (Layer Diagram)

```mermaid
graph TD
    subgraph Client["🖥️ Client Layer"]
        FE[HTML/JS Frontend<br/>fetch API]
    end

    subgraph Server["⚙️ Express Server (Node.js)"]
        MW[Middleware<br/>validate · errorHandler · logger]
        R[Routes<br/>tasks.js · labels.js]
        C[Controllers<br/>taskController · labelController]
        SC[Schemas<br/>Zod Validation]
    end

    subgraph Data["🗄️ Data Layer"]
        DB[better-sqlite3<br/>SQLite Database]
        SQL[(tasks.db<br/>tasks · labels · task_labels)]
    end

    FE -->|HTTP REST| MW
    MW --> R
    R --> SC
    SC -->|validated data| C
    C --> DB
    DB --> SQL
    C -->|JSON response| R
    R -->|JSON| FE
```

---

## 2. Өгөгдлийн урсгал (Data Flow)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant E as Express Router
    participant V as Zod Validator
    participant C as Controller
    participant D as SQLite DB

    U->>E: POST /api/tasks {title, priority, dueDate, labels}
    E->>V: Validate request body
    alt Invalid input
        V-->>U: 400 Bad Request {error}
    end
    V->>C: Validated data
    C->>D: INSERT INTO tasks ...
    D-->>C: {id, ...newTask}
    C->>D: INSERT INTO task_labels ...
    D-->>C: OK
    C-->>E: {data: task, message: "Created"}
    E-->>U: 201 Created {data, message}
```

---

## 3. Өгөгдлийн загвар (Entity Relationship)

```mermaid
erDiagram
    TASKS {
        int id PK
        string title
        string description
        string status
        string priority
        date due_date
        datetime created_at
        datetime updated_at
    }

    LABELS {
        int id PK
        string name
        string color
    }

    TASK_LABELS {
        int task_id FK
        int label_id FK
    }

    TASKS ||--o{ TASK_LABELS : "has"
    LABELS ||--o{ TASK_LABELS : "tagged to"
```

---

## 4. API Endpoint бүтэц

```mermaid
graph LR
    subgraph Tasks API
        T1[GET /api/tasks]
        T2[POST /api/tasks]
        T3[GET /api/tasks/:id]
        T4[PUT /api/tasks/:id]
        T5[DELETE /api/tasks/:id]
        T6[PATCH /api/tasks/:id/status]
    end

    subgraph Labels API
        L1[GET /api/labels]
        L2[POST /api/labels]
        L3[DELETE /api/labels/:id]
    end

    subgraph Query Params
        Q1["?search=keyword"]
        Q2["?priority=HIGH"]
        Q3["?status=pending"]
        Q4["?label=work"]
        Q5["?overdue=true"]
    end

    T1 --> Q1
    T1 --> Q2
    T1 --> Q3
    T1 --> Q4
    T1 --> Q5
```

---

## 5. Хавтасны бүтэц (Directory Structure)

```
partB/
├── src/
│   ├── server.js           # HTTP сервер эхлүүлэгч
│   ├── app.js              # Express тохиргоо, middleware
│   ├── db/
│   │   ├── database.js     # SQLite connection singleton
│   │   └── schema.sql      # Хүснэгт үүсгэх SQL
│   ├── routes/
│   │   ├── tasks.js        # /api/tasks бүх route
│   │   └── labels.js       # /api/labels бүх route
│   ├── controllers/
│   │   ├── taskController.js   # Task CRUD logic
│   │   └── labelController.js  # Label CRUD logic
│   ├── middleware/
│   │   ├── errorHandler.js # Global error handler
│   │   └── validate.js     # Zod validation wrapper
│   └── schemas/
│       └── taskSchema.js   # Zod schema тодорхойлолт
├── tests/
│   ├── tasks.test.js
│   └── labels.test.js
├── openapi.yaml
├── package.json
└── README.md
```

---

## 6. Модулийн тодорхойлолт

| Модуль | Үүрэг |
|---|---|
| `server.js` | Port-оос сонсох, graceful shutdown |
| `app.js` | Middleware бүртгэл, route mount |
| `db/database.js` | `better-sqlite3` connection, schema init |
| `routes/tasks.js` | Task endpoint-уудын Router |
| `routes/labels.js` | Label endpoint-уудын Router |
| `controllers/taskController.js` | Task бизнес логик (CRUD + filter + search) |
| `controllers/labelController.js` | Label бизнес логик |
| `middleware/errorHandler.js` | Express error handler (500, 404) |
| `middleware/validate.js` | Zod schema-аар req.body шалгах |
| `schemas/taskSchema.js` | Task/Label-ийн Zod schema |