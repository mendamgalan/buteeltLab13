/**
 * Task controller with CRUD operations
 */
class TaskController {
  constructor(db) {
    this.db = db;
  }

  /**
   * Get all tasks with optional filtering and sorting
   */
  getAllTasks(filters = {}) {
    let query = 'SELECT t.* FROM tasks t WHERE 1=1';
    const params = [];

    if (filters.completed !== undefined) {
      query += ' AND t.completed = ?';
      params.push(filters.completed ? 1 : 0);
    }

    if (filters.priority !== undefined) {
      query += ' AND t.priority = ?';
      params.push(filters.priority);
    }

    if (filters.search) {
      query += ' AND (t.title LIKE ? OR t.description LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm);
    }

    if (filters.label) {
      query += ` AND t.id IN (
        SELECT tl.task_id FROM task_labels tl
        JOIN labels l ON tl.label_id = l.id
        WHERE l.name = ?
      )`;
      params.push(filters.label);
    }

    const sort = filters.sort || 'created_at';
    const order = filters.order || 'desc';
    query += ` ORDER BY t.${sort} ${order.toUpperCase()}`;

    return this.db.all(query, params);
  }

  /**
   * Get task by ID with labels
   */
  getTaskById(id) {
    const task = this.db.get('SELECT t.* FROM tasks t WHERE t.id = ?', [id]);

    if (!task) {
      return null;
    }

    const labels = this.db.all(
      `SELECT l.id, l.name, l.color FROM labels l
       JOIN task_labels tl ON l.id = tl.label_id
       WHERE tl.task_id = ?`,
      [id]
    );
    task.labels = labels;

    return task;
  }

  /**
   * Create new task
   */
  createTask(data) {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const query = `
      INSERT INTO tasks (title, description, priority, due_date, completed, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    this.db.run(query, [
      data.title,
      data.description || null,
      data.priority || 0,
      data.dueDate || null,
      data.completed ? 1 : 0,
      now,
      now,
    ]);

    // Get the newly created task
    const task = this.db.get(`
      SELECT * FROM tasks WHERE title = ? AND created_at = ?
    `, [data.title, now]);

    if (task) {
      return this.getTaskById(task.id);
    }

    return null;
  }

  /**
   * Update task
   */
  updateTask(id, data) {
    const task = this.getTaskById(id);
    if (!task) {
      return null;
    }

    const updates = [];
    const params = [];

    if (data.title !== undefined) {
      updates.push('title = ?');
      params.push(data.title);
    }
    if (data.description !== undefined) {
      updates.push('description = ?');
      params.push(data.description || null);
    }
    if (data.priority !== undefined) {
      updates.push('priority = ?');
      params.push(data.priority);
    }
    if (data.dueDate !== undefined) {
      updates.push('due_date = ?');
      params.push(data.dueDate || null);
    }
    if (data.completed !== undefined) {
      updates.push('completed = ?');
      params.push(data.completed ? 1 : 0);
    }

    if (updates.length === 0) {
      return task;
    }

    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
    updates.push('updated_at = ?');
    params.push(now);
    params.push(id);

    const query = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
    this.db.run(query, params);

    return this.getTaskById(id);
  }

  /**
   * Delete task
   */
  deleteTask(id) {
    const task = this.getTaskById(id);
    if (!task) {
      return false;
    }

    this.db.run('DELETE FROM tasks WHERE id = ?', [id]);
    return true;
  }

  /**
   * Add label to task
   */
  addLabelToTask(taskId, labelId) {
    const task = this.getTaskById(taskId);
    if (!task) {
      return null;
    }

    this.db.run(
      `INSERT OR IGNORE INTO task_labels (task_id, label_id) VALUES (?, ?)`,
      [taskId, labelId]
    );

    return this.getTaskById(taskId);
  }

  /**
   * Remove label from task
   */
  removeLabelFromTask(taskId, labelId) {
    const task = this.getTaskById(taskId);
    if (!task) {
      return null;
    }

    this.db.run(
      `DELETE FROM task_labels WHERE task_id = ? AND label_id = ?`,
      [taskId, labelId]
    );

    return this.getTaskById(taskId);
  }
}

module.exports = TaskController;
