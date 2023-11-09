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
  const { title, price, sex, category, size, description, status } = req.body;
  const newItem = await modelItems.create({
    title,
    price,
    sex,
    category,
    size,
    description,
    status,
  });

  res.status(201).json(newItem);
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
  const { itemId } = req.params;
  console.log("req.params :", req.params);
  console.log("itemId :", itemId);
  const item = await modelItems.findById(itemId);
  console.log("item :", item);

  if (!item) {
    return next(HttpError(404));
  }

  await modelItems.findByIdAndRemove(itemId);
  return res.status(200).json({ message: "Item was deleted" });
}

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  changeStatus,
  deleteItem,
};
