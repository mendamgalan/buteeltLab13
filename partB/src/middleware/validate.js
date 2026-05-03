/**
 * Validation middleware using Zod schemas
 */
function validate(schema) {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (err) {
      res.status(400).json({
        error: {
          status: 400,
          message: 'Validation failed',
          details: err.errors,
        },
      });
    }
  };
}

/**
 * Wrap async route handlers to catch errors
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = { validate, asyncHandler };
