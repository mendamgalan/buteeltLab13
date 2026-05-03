# Personal Task Tracker API

A RESTful API for managing personal tasks with priorities, labels, due dates, and search/filter capabilities.

## Quick Start

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development

Start the development server with auto-reload:

```bash
npm run dev
```

The server will be available at `http://localhost:3000`
API documentation (Swagger UI) at `http://localhost:3000/api-docs`

### Production

```bash
npm start
```

### Testing

Run all tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Linting

```bash
npm run lint
```

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks with optional filtering
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/labels/:labelId` - Add label to task
- `DELETE /api/tasks/:id/labels/:labelId` - Remove label from task

### Labels

- `GET /api/labels` - Get all labels
- `GET /api/labels/:id` - Get label by ID
- `POST /api/labels` - Create new label
- `PATCH /api/labels/:id` - Update label
- `DELETE /api/labels/:id` - Delete label

## Example Usage

### Create a task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task tracker",
    "priority": 1,
    "dueDate": "2024-12-31T23:59:59Z"
  }'
```

### Create a label

```bash
curl -X POST http://localhost:3000/api/labels \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Work",
    "color": "#FF0000"
  }'
```

### Get tasks with filtering

```bash
curl 'http://localhost:3000/api/tasks?completed=false&priority=1&sort=due_date&order=asc'
```

## Environment Variables

```env
PORT=3000                    # Server port
NODE_ENV=development         # Environment (development/production)
DB_PATH=./tasks.db          # SQLite database path
```

## Database

SQLite database with the following tables:
- `tasks` - Task records
- `labels` - Label definitions
- `task_labels` - Junction table for task-label relationships

## Project Structure

```
partB/
├── src/
│   ├── app.js              # Express app setup
│   ├── server.js           # Entry point
│   ├── db/
│   │   ├── database.js     # SQLite connection
│   │   └── schema.sql      # Table definitions
│   ├── routes/
│   │   ├── tasks.js        # Task routes
│   │   └── labels.js       # Label routes
│   ├── controllers/
│   │   ├── taskController.js
│   │   └── labelController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validate.js
│   └── schemas/
│       └── taskSchema.js   # Zod validation schemas
├── tests/
│   ├── tasks.test.js       # Task tests
│   └── labels.test.js      # Label tests
├── openapi.yaml            # OpenAPI 3.0 specification
└── jest.config.js          # Jest configuration
```

## License

MIT
