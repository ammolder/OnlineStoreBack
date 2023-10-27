const { HttpError } = require("../helpers/index");

const { modelItems } = require("../models/item");

// async function getItems(res, next) {
//   const result = await Items.find();
//   res.json(result);
// }
async function getItems(req, res, next) {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  const items = await modelItems.find().skip(skip).limit(limit);
  return res.json(items);
}

async function getItem(req, res, next) {
  const { itemId } = req.params;
  const item = await modelItems.findById(itemId);

  if (!item) {
    return next(HttpError(404, "Not foundg"));
  }
  return res.json(item);
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

module.exports = {
  getItems,
  getItem,
  createItem,
  //   deleteItem,
  //   changeItem,
  //   changeStatus,
};

// class ControlerTasks {
//     // * getItems

//   getItems = expressAsyncHandler(async (req, res) => {
//     // const { _id: owner } = req.user;
//     // const filter = getFilter({ ...req.query });
//     // const tasks = await tasksServices.show(owner, filter);
//     // res.status(200).json({ code: 200, data: tasks, count: tasks.length });
//   });

//   // * getItemById
//   getItemById = expressAsyncHandler(async (req, res) => {
//     // const { id } = req.params;
//     // const task = await tasksServices.showById(id);
//     // res.status(200).json({ code: 200, data: task });
//   });

//   // * addItem
//   addItem = expressAsyncHandler(async (req, res) => {
//     // const { _id: owner } = req.user;
//     // const task = await tasksServices.add(owner, { ...req.body });
//     // res.status(201).json({ code: 201, data: task });
//   });

//   // * changeItem
//   changeItem = expressAsyncHandler(async (req, res) => {
//     // const { id } = req.params;
//     // const task = await tasksServices.change(id, { ...req.body });
//     // res.status(200).json({ code: 200, data: task });
//   });

//   // * changeCategoryItem
//   changeCategoryItem = expressAsyncHandler(async (req, res) => {
//     // const { id } = req.params;
//     // const task = await tasksServices.changeCategory(id, { ...req.body });
//     // res.status(200).json({ code: 200, data: task });
//   });

//   // * deleteItem
//   deleteItem = expressAsyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const review = await tasksServices.remove(id);

//     res.status(200).json({ code: 200, data: review });
//   });
// }

// const controlerTasks = new ControlerTasks();
// module.exports = controlerTasks;
