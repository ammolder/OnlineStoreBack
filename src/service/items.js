const { modelItems } = require("../models/item");

class ItemsServices {
  findByParams = (page, limit, skip) => modelItems.find().skip(skip).limit(limit);

  findById = (itemId) => modelItems.findById(itemId);
}

const itemsServices = new ItemsServices();
module.exports = itemsServices;
