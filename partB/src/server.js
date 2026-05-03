require('dotenv').config();
const { initializeDatabase } = require('./db/database');
const createApp = require('./app');

const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || './tasks.db';

/**
 * Start the server
 */
async function start() {
  const db = await initializeDatabase(DB_PATH);
  const app = createApp(db);

  const server = app.listen(PORT, () => {
    console.error(`✓ Server running on http://localhost:${PORT}`);
    console.error(`✓ API docs available at http://localhost:${PORT}/api-docs`);
  });

  process.on('SIGTERM', () => {
    console.error('SIGTERM received, shutting down gracefully...');
    server.close(() => {
      process.exit(0);
    });
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

