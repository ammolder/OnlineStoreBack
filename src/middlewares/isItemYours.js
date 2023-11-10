const { HttpError } = require("../helpers");

const isItemYours = (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { owner: ownerId } = req.item;

    const isYours = userId.equals(ownerId);

    if (!isYours) {
      return next(HttpError(403, "You cannot delete an item that does not belong to you"));
    }

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = isItemYours;
