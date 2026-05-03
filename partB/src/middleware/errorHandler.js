/**
 * Express error handling middleware
 */
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Don't expose stack traces in production
  const details = process.env.NODE_ENV === 'production' ? undefined : err.stack;

  res.status(status).json({
    error: {
      status,
      message,
      ...(details && { details }),
    },
  });
}

module.exports = errorHandler;
