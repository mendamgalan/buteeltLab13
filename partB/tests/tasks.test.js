const request = require('supertest');
const { initializeDatabase } = require('../src/db/database');
const createApp = require('../src/app');

describe('Tasks API', () => {
  let app;
  let db;

  beforeEach(async () => {
    db = await initializeDatabase(':memory:');
    app = createApp(db);
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Test Task',
          description: 'Test Description',
          priority: 1,
        });

      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.title).toBe('Test Task');
      expect(res.body.message).toBe('Task created');
    });

    it('should reject task with missing title', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          description: 'No title',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('GET /api/tasks', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/tasks')
        .send({
          title: 'Task 1',
          priority: 1,
          completed: false,
        });

      await request(app)
        .post('/api/tasks')
        .send({
          title: 'Task 2',
          priority: 2,
          completed: true,
        });
    });

    it('should retrieve all tasks', async () => {
      const res = await request(app).get('/api/tasks');

      expect(res.status).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should filter tasks by completed status', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .query({ completed: true });

      expect(res.status).toBe(200);
      expect(res.body.data.every((t) => t.completed === 1)).toBe(true);
    });

    it('should filter tasks by priority', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .query({ priority: 1 });

      expect(res.status).toBe(200);
      expect(res.body.data.every((t) => t.priority === 1)).toBe(true);
    });
  });

  describe('GET /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Single Task',
        });
      taskId = res.body.data.id;
    });

    it('should retrieve task by ID', async () => {
      const res = await request(app).get(`/api/tasks/${taskId}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(taskId);
      expect(res.body.data.title).toBe('Single Task');
    });

    it('should return 404 for non-existent task', async () => {
      const res = await request(app).get('/api/tasks/9999');

      expect(res.status).toBe(404);
    });
  });

  describe('PATCH /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Original Title',
        });
      taskId = res.body.data.id;
    });

    it('should update task', async () => {
      const res = await request(app)
        .patch(`/api/tasks/${taskId}`)
        .send({
          title: 'Updated Title',
          priority: 2,
        });

      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('Updated Title');
      expect(res.body.data.priority).toBe(2);
    });

    it('should return 404 when updating non-existent task', async () => {
      const res = await request(app)
        .patch('/api/tasks/9999')
        .send({
          title: 'Updated',
        });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          title: 'To Delete',
        });
      taskId = res.body.data.id;
    });

    it('should delete task', async () => {
      const res = await request(app).delete(`/api/tasks/${taskId}`);

      expect(res.status).toBe(204);

      const getRes = await request(app).get(`/api/tasks/${taskId}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 when deleting non-existent task', async () => {
      const res = await request(app).delete('/api/tasks/9999');

      expect(res.status).toBe(404);
    });
  });
});
