const AppError = require("../utils/appError");

// HANDLE CAST ERROR FROM MONGODB
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 404);
};

// HANDLE DUPLICAT ERROR FROM MONGODB
const handleDuplicateErrorDB = (err) => {
  const message = `please enter valid id for tour`;
  return new AppError(message, 404);
};

// HANDLE VALIDATION ERROR FROM MONGODB
const handleValidationErrorDB = (err) => {
  const error = Object.values(err.errors).map((el) => el.properties.message);
  const message = `please input correct field ${error}`;

  return new AppError(message, 404);
};

// SEND ERROR TO DEVELOPMENT
const sendDevelopmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    message: err.message,
    stack: err.stack,
    error: {
      err,
    },
  });
};

// SEND ERROR TO PRODUCTION
const sendProductionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      name: err.name,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
    });
  }
};

// EXPORTS AS A GLOBAL ERROR HANDLER
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  if (process.env.NODE_ENV === "development") {
    sendDevelopmentError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateErrorDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);

    sendProductionError(error, res);
  }
};
