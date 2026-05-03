const express = require('express');
const swaggerUi = require('swagger-ui-express');
const TaskController = require('./controllers/taskController');
const LabelController = require('./controllers/labelController');
const createTaskRoutes = require('./routes/tasks');
const createLabelRoutes = require('./routes/labels');
const errorHandler = require('./middleware/errorHandler');

/**
 * Create and configure Express app
 */
function createApp(db) {
  const app = express();

  // Middleware
  app.use(express.json());

  // Initialize controllers
  const taskController = new TaskController(db);
  const labelController = new LabelController(db);

  // Routes
  app.use('/api/tasks', createTaskRoutes(taskController));
  app.use('/api/labels', createLabelRoutes(labelController));

  // Swagger UI with basic spec
  const swaggerDocument = {
    openapi: '3.0.0',
    info: {
      title: 'Personal Task Tracker API',
      description: 'A RESTful API for managing personal tasks with labels and priorities',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  };

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      error: {
        status: 404,
        message: 'Route not found',
      },
    });
  });

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
