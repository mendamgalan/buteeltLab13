const express = require('express');
const { validate, asyncHandler } = require('../middleware/validate');
const { labelSchema } = require('../schemas/taskSchema');

/**
 * Create labels routes
 */
function createLabelRoutes(labelController) {
  const router = express.Router();

  /**
   * GET /labels - Get all labels
   */
  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const labels = labelController.getAllLabels();

      res.json({
        data: labels,
        message: `Retrieved ${labels.length} labels`,
      });
    })
  );

  /**
   * GET /labels/:id - Get label by ID
   */
  router.get(
    '/:id',
    asyncHandler(async (req, res) => {
      const label = labelController.getLabelById(parseInt(req.params.id, 10));

      if (!label) {
        return res.status(404).json({
          error: {
            status: 404,
            message: 'Label not found',
          },
        });
      }

      res.json({
        data: label,
        message: 'Label retrieved',
      });
    })
  );

  /**
   * POST /labels - Create new label
   */
  router.post(
    '/',
    validate(labelSchema),
    asyncHandler(async (req, res) => {
      const label = labelController.createLabel(req.body);

      res.status(201).json({
        data: label,
        message: 'Label created',
      });
    })
  );

  /**
   * PATCH /labels/:id - Update label
   */
  router.patch(
    '/:id',
    validate(labelSchema.partial()),
    asyncHandler(async (req, res) => {
      const label = labelController.updateLabel(parseInt(req.params.id, 10), req.body);

      if (!label) {
        return res.status(404).json({
          error: {
            status: 404,
            message: 'Label not found',
          },
        });
      }

      res.json({
        data: label,
        message: 'Label updated',
      });
    })
  );

  /**
   * DELETE /labels/:id - Delete label
   */
  router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
      const deleted = labelController.deleteLabel(parseInt(req.params.id, 10));

      if (!deleted) {
        return res.status(404).json({
          error: {
            status: 404,
            message: 'Label not found',
          },
        });
      }

      res.status(204).send();
    })
  );

  return router;
}

module.exports = createLabelRoutes;
