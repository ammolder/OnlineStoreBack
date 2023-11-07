const { HttpError } = require("../helpers");

function validateBody(validator) {
  return (req, res, next) => {
    const { error } = validator.validate(req.body);

    if (error) {
      return next(HttpError(400, error.message));
    }
    return next();
  };
}
module.exports = validateBody;
