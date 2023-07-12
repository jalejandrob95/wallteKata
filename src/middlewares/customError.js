const CustomError = require("../services/Error/errorHandler.service.js");

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function handleError(err, req, res, next) {
  let customError = err;
  if (!(err instanceof CustomError)) {
    customError = new CustomError("Oh no. We are having troubles my friend");
  }

  res.status(customError.status).send(customError);
}

module.exports = handleError;
