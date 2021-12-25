const ErrorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // yaani mochkl f server  500
  // we will seperate the developpement error and production error
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message || "internel sever error",
  });
};
