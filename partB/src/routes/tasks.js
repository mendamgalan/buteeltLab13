const express = require('express');
const { validate, asyncHandler } = require('../middleware/validate');
const { taskSchema, taskUpdateSchema, taskFilterSchema } = require('../schemas/taskSchema');

/**
 * Create tasks routes
 */
function createTaskRoutes(taskController) {
  const router = express.Router();

  /**
   * GET /tasks - Get all tasks with optional filtering
   */
  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const filters = taskFilterSchema.parse(req.query);
      const tasks = taskController.getAllTasks(filters);

      res.json({
        data: tasks,
        message: `Retrieved ${tasks.length} tasks`,
      });
    })
  );

  /**
   * GET /tasks/:id - Get task by ID
   */
  router.get(
    '/:id',
    asyncHandler(async (req, res) => {
      const task = taskController.getTaskById(parseInt(req.params.id, 10));

      if (!task) {
        return res.status(404).json({
          error: {
            status: 404,
            message: 'Task not found',
          },
        });
      }

      res.json({
        data: task,
        message: 'Task retrieved',
      });
    })
  );

  /**
   * POST /tasks - Create new task
   */
  router.post(
    '/',
    validate(taskSchema),
    asyncHandler(async (req, res) => {
      const task = taskController.createTask(req.body);

      res.status(201).json({
        data: task,
        message: 'Task created',
      });
    })
  );

  /**
   * PATCH /tasks/:id - Update task
   */
  router.patch(
    '/:id',
    validate(taskUpdateSchema),
    asyncHandler(async (req, res) => {
      const task = taskController.updateTask(parseInt(req.params.id, 10), req.body);

      if (!task) {
        return res.status(404).json({
          error: {
            status: 404,
            message: 'Task not found',
          },
        });
      }

      res.json({
        data: task,
        message: 'Task updated',
      });
    })
  );

  /**
   * DELETE /tasks/:id - Delete task
   */
  router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
      const deleted = taskController.deleteTask(parseInt(req.params.id, 10));

      if (!deleted) {
        return res.status(404).json({
          error: {
            status: 404,
            message: 'Task not found',
          },
        });
      }

      res.status(204).send();
    })
  );

  /**
   * POST /tasks/:id/labels/:labelId - Add label to task
   */
  router.post(
    '/:id/labels/:labelId',
    asyncHandler(async (req, res) => {
      const task = taskController.addLabelToTask(
        parseInt(req.params.id, 10),
        parseInt(req.params.labelId, 10)
      );

      if (!task) {
        return res.status(404).json({
          error: {
            status: 404,
            message: 'Task not found',
          },
        });
      }

      res.json({
        data: task,
        message: 'Label added to task',
      });
    })
  );

  /**
   * DELETE /tasks/:id/labels/:labelId - Remove label from task
   */
  router.delete(
    '/:id/labels/:labelId',
    asyncHandler(async (req, res) => {
      const task = taskController.removeLabelFromTask(
        parseInt(req.params.id, 10),
        parseInt(req.params.labelId, 10)
      );

      if (!task) {
        return res.status(404).json({
          error: {
            status: 404,
            message: 'Task not found',
          },
        });
      }

      res.json({
        data: task,
        message: 'Label removed from task',
      });
    })
  );

  return router;
}

module.exports = createTaskRoutes;
