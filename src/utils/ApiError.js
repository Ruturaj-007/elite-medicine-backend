class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message); // calls parent constructor 
    this.statusCode = statusCode;
    this.isOperational = isOperational;              // tells whether there is an expected error or not 
    Error.captureStackTrace(this, this.constructor); // tells u when the error happened
  }
}

module.exports = ApiError;