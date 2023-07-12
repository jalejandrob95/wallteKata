const validationResult = require("express-validator").validationResult;

const validateRequest = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ responseErrors: error.array() });
  }
  next();
};

module.exports = validateRequest;
