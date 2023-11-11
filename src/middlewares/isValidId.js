const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (paramsField = "itemId") => (req, res, next) => {
  try {
    const id = req.params[paramsField];

    if (!isValidObjectId(id)) {
      return next(HttpError(400, `${id} is not valid ${paramsField}`));
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = isValidId;
