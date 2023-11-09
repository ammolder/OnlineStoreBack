const { modelItems } = require("../models/item");

class ItemsServices {
  getByParams = (page, limit, skip) => modelItems.find().skip(skip).limit(limit);
}

const itemsServices = new ItemsServices();
module.exports = itemsServices;
