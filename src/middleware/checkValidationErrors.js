const { validationResult } = require("express-validator");

const checkValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validationErrors = {};
    errors.array().forEach((error) => {
      return (validationErrors[error.param] = error.msg);
    });

    return res.status(400).send({ validationErrors: validationErrors });
  }

  next();
};

module.exports = checkValidationErrors;
