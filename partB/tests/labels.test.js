const request = require('supertest');
const { initializeDatabase } = require('../src/db/database');
const createApp = require('../src/app');

describe('Labels API', () => {
  let app;
  let db;

  beforeEach(async () => {
    db = await initializeDatabase(':memory:');
    app = createApp(db);
  });

  describe('POST /api/labels', () => {
    it('should create a new label', async () => {
      const res = await request(app)
        .post('/api/labels')
        .send({
          name: 'Work',
          color: '#FF0000',
        });

      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.name).toBe('Work');
      expect(res.body.message).toBe('Label created');
    });

    it('should reject label with missing name', async () => {
      const res = await request(app)
        .post('/api/labels')
        .send({
          color: '#FF0000',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('should reject label with invalid color format', async () => {
      const res = await request(app)
        .post('/api/labels')
        .send({
          name: 'Invalid',
          color: 'red',
        });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/labels', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/labels')
        .send({
          name: 'Important',
        });

      await request(app)
        .post('/api/labels')
        .send({
          name: 'Later',
        });
    });

    it('should retrieve all labels', async () => {
      const res = await request(app).get('/api/labels');

      expect(res.status).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should include task count for each label', async () => {
      const res = await request(app).get('/api/labels');

      expect(res.status).toBe(200);
      expect(res.body.data[0]).toHaveProperty('task_count');
    });
  });

  describe('GET /api/labels/:id', () => {
    let labelId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/labels')
        .send({
          name: 'Unique Label',
        });
      labelId = res.body.data.id;
    });

    it('should retrieve label by ID', async () => {
      const res = await request(app).get(`/api/labels/${labelId}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(labelId);
      expect(res.body.data.name).toBe('Unique Label');
    });

    it('should return 404 for non-existent label', async () => {
      const res = await request(app).get('/api/labels/9999');

      expect(res.status).toBe(404);
    });
  });

  describe('PATCH /api/labels/:id', () => {
    let labelId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/labels')
        .send({
          name: 'Original',
        });
      labelId = res.body.data.id;
    });

    it('should update label', async () => {
      const res = await request(app)
        .patch(`/api/labels/${labelId}`)
        .send({
          name: 'Updated',
          color: '#00FF00',
        });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('Updated');
      expect(res.body.data.color).toBe('#00FF00');
    });

    it('should return 404 when updating non-existent label', async () => {
      const res = await request(app)
        .patch('/api/labels/9999')
        .send({
          name: 'Updated',
        });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/labels/:id', () => {
    let labelId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/labels')
        .send({
          name: 'To Delete',
        });
      labelId = res.body.data.id;
    });

    it('should delete label', async () => {
      const res = await request(app).delete(`/api/labels/${labelId}`);

      expect(res.status).toBe(204);

      const getRes = await request(app).get(`/api/labels/${labelId}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 when deleting non-existent label', async () => {
      const res = await request(app).delete('/api/labels/9999');

      expect(res.status).toBe(404);
    });
  });
});
