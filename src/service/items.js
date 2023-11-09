const { modelItems } = require("../models/item");
const { HttpError } = require("../helpers");

class ItemsServices {
  findByParams = (page, limit, skip) => modelItems.find().skip(skip).limit(limit);

  findById = (itemId) => modelItems.findById(itemId);

  create = async (item) => {
    const newItem = await modelItems.create(item);

    if (!newItem) {
      throw HttpError(400, "Error create user");
    }

    return newItem;
  }

  delete = async (itemId) => modelItems.findByIdAndRemove(itemId);
}

const itemsServices = new ItemsServices();
module.exports = itemsServices;
