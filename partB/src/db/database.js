const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

let SQL;

/**
 * Initialize and return SQLite database connection
 */
async function initializeDatabase(dbPath) {
  if (!SQL) {
    SQL = await initSqlJs();
  }

  let db;

  // Load existing database or create new one
  if (dbPath !== ':memory:' && fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Read and execute schema
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');

  const statements = schema.split(';').filter((s) => s.trim());
  for (const statement of statements) {
    if (statement.trim()) {
      try {
        db.run(statement);
      } catch (e) {
        // Ignore errors for CREATE IF NOT EXISTS
      }
    }
  }

  // Wrap database to add persistence and helper methods
  return {
    _db: db,
    _path: dbPath,

    prepare(sql) {
      return this._db.prepare(sql);
    },

    run(sql, params = []) {
      try {
        const stmt = this._db.prepare(sql);
        stmt.bind(params);
        stmt.step();
        stmt.free();
        this._persist();
      } catch (e) {
        throw e;
      }
    },

    all(sql, params = []) {
      try {
        const stmt = this._db.prepare(sql);
        stmt.bind(params);
        const results = [];
        while (stmt.step()) {
          results.push(stmt.getAsObject());
        }
        stmt.free();
        return results;
      } catch (e) {
        throw e;
      }
    },

    get(sql, params = []) {
      const results = this.all(sql, params);
      return results[0] || null;
    },

    lastInsertId() {
      const result = this.get('SELECT last_insert_rowid() as id');
      return result?.id || null;
    },

    _persist() {
      if (this._path !== ':memory:') {
        try {
          const data = this._db.export();
          const buffer = Buffer.from(data);
          fs.writeFileSync(this._path, buffer);
        } catch (e) {
          // Ignore persistence errors for now
        }
      }
    },
  };
}

module.exports = { initializeDatabase };
