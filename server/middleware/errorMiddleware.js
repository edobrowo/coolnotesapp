const errorHandler = (err, req, res, next) => {
  // Set status code, 500 is catch-all default
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  // Only include stack trace in development
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
