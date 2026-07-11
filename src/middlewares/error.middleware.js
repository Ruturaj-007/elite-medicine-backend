const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');
const env = require('../config/env');

function errorMiddleware(err, req, res, next) {
  let { statusCode, message, isOperational } = err;

// error is not our custom error   
  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = 'Something went wrong';
    isOperational = false;
  }

  if (!isOperational) {
    logger.error({ 
        err
    }, 'Unexpected error');
  }

  res.status(statusCode || 500).json({
    success: false,
    message,
    ...(env.nodeEnv === 'development' && !isOperational && { stack: err.stack }),
  });
}

module.exports = errorMiddleware;