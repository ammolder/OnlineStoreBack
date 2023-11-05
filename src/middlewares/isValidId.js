const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { itemId } = req.params;
  if (!isValidObjectId(itemId)) {
    next(HttpError(400, `${itemId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
