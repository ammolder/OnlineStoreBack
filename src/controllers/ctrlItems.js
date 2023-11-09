const { itemsServices } = require("../service");
const { HttpError } = require("../helpers");
const { modelItems } = require("../models/item");

async function getAllItems(req, res, next) {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    const items = await itemsServices.findByParams(page, limit, skip);

    return res.json(items);
  } catch (e) {
    next(e);
  }
}

async function getItemById(req, res) {
  return res.json(req.item);
}

async function createItem(req, res, next) {
  try {
    const newItem = req.body;

    const createdItem = await itemsServices.create(newItem);

    res.status(201).json(createdItem);
  } catch (e) {
    next(e);
  }
}

async function updateItem(req, res, next) {
  const { itemId } = req.params;
  // const { title, price, sex, category, size, description, status } = req.body;

  // if (!title & !price & !sex & !category & !size & !description & !status) {
  //   return next(HttpError(400, "missing fields"));
  // }
  const updateItem = await modelItems.findByIdAndUpdate(itemId, req.body);

  if (!updateItem) {
    return next(HttpError(400, "missing fields"));
  }
  const item = await modelItems.findById(itemId);

  return res.status(200).json(item);
}

async function changeStatus(req, res, next) {
  const { itemId } = req.params;
  const { status } = req.body;
  const updateItem = await modelItems.findByIdAndUpdate(itemId, { status });

  if (!updateItem) {
    return next(HttpError(400));
  }
  const item = await modelItems.findById(itemId);

  return res.status(200).json(item);
}

async function deleteItem(req, res, next) {
  try {
    const itemId = req.item._id;

    await itemsServices.delete(itemId);

    return res.status(200).json({ message: "Item was deleted" });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  changeStatus,
  deleteItem,
};
