const { log } = require('./logger');

// Middleware for handling errors
const errorHandler = (err, req, res, next) => {
  log(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Middleware for handling 404 errors
const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
