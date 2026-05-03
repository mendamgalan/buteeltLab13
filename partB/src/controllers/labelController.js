/**
 * Label controller for managing task labels
 */
class LabelController {
  constructor(db) {
    this.db = db;
  }

  /**
   * Get all labels
   */
  getAllLabels() {
    return this.db.all(`
      SELECT l.id, l.name, l.color, COUNT(tl.task_id) as task_count
      FROM labels l
      LEFT JOIN task_labels tl ON l.id = tl.label_id
      GROUP BY l.id
      ORDER BY l.name ASC
    `);
  }

  /**
   * Get label by ID
   */
  getLabelById(id) {
    return this.db.get(`
      SELECT l.id, l.name, l.color, COUNT(tl.task_id) as task_count
      FROM labels l
      LEFT JOIN task_labels tl ON l.id = tl.label_id
      WHERE l.id = ?
      GROUP BY l.id
    `, [id]);
  }

  /**
   * Create new label
   */
  createLabel(data) {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

    this.db.run(`
      INSERT INTO labels (name, color, created_at)
      VALUES (?, ?, ?)
    `, [data.name, data.color || null, now]);

    // Get the newly created label
    const label = this.db.get(`
      SELECT * FROM labels WHERE name = ? AND created_at = ?
    `, [data.name, now]);

    if (label) {
      return this.getLabelById(label.id);
    }

    return null;
  }

  /**
   * Update label
   */
  updateLabel(id, data) {
    const label = this.getLabelById(id);
    if (!label) {
      return null;
    }

    const updates = [];
    const params = [];

    if (data.name !== undefined) {
      updates.push('name = ?');
      params.push(data.name);
    }
    if (data.color !== undefined) {
      updates.push('color = ?');
      params.push(data.color || null);
    }

    if (updates.length === 0) {
      return label;
    }

    params.push(id);
    const query = `UPDATE labels SET ${updates.join(', ')} WHERE id = ?`;
    this.db.run(query, params);

    return this.getLabelById(id);
  }

  /**
   * Delete label
   */
  deleteLabel(id) {
    const label = this.getLabelById(id);
    if (!label) {
      return false;
    }

    this.db.run('DELETE FROM labels WHERE id = ?', [id]);
    return true;
  }
}

module.exports = LabelController;
