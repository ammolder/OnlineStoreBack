const { itemsServices } = require("../service");
const { HttpError } = require("../helpers");

const isItemExists = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await itemsServices.findById(itemId);

    if (!item) {
      return next(HttpError(404, "Item not found"));
    }

    req.item = item;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = isItemExists;
