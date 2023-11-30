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

async function getUserItems(req, res, next) {
  try {
    const { user } = req;
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    const userItems = await itemsServices.findByUserId(user._id, skip, limit);

    return res.json(userItems);
  } catch (e) {
    next(e);
  }
}

async function createItem(req, res, next) {
  try {
    const { _id } = req.user;
    const newItem = { ...req.body, owner: _id };

    const createdItem = await itemsServices.create(newItem);

    res.status(201).json(createdItem);
  } catch (e) {
    next(e);
  }
}

async function updateItem(req, res, next) {
  try {
    const { itemId } = req.params;
    const updateItem = await modelItems.findByIdAndUpdate(itemId, req.body);

    if (!updateItem) {
      return next(HttpError(400, "missing fields"));
    }
    const item = await modelItems.findById(itemId);

    return res.status(200).json(item);
  } catch (e) {
    next(e);
  }
}

async function changeStatus(req, res, next) {
  try {
    const { itemId } = req.params;
    const { status } = req.body;
    const updateItem = await modelItems.findByIdAndUpdate(itemId, { status });

    if (!updateItem) {
      return next(HttpError(400));
    }
    const item = await modelItems.findById(itemId);

    return res.status(200).json(item);
  } catch (e) {
    next(e);
  }
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
  getUserItems,
};
