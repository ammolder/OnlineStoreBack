const { modelItem } = require("../models/item");
const { HttpError } = require("../helpers");

class ItemServices {
  //   show = async (owner, filter) => {
  //     const tasks = await modelTask.find(
  //       { owner, date: { $regex: filter, $options: "i" } },
  //       "-createdAt -updatedAt -__v"
  //     );

  //     if (!tasks) {
  //       throw HttpError(400, "Unable to fetch Tasks");
  //     }

  //     return tasks;
  //   };

  //   showById = async (id) => {
  //     const task = await modelTask.findById(id, "-createdAt -updatedAt -__v");

  //     if (!task) {
  //       throw HttpError(400, "Unable to find Task");
  //     }

  //     return task;
  //   };

  //   add = async (owner, data) => {
  //     const tasks = await modelTask.create({ ...data, owner });

  //     if (!tasks) {
  //       throw HttpError(400, "Unable to save in DataBase");
  //     }
  //     const { createdAt, updatedAt, __v, ...createdTask } = tasks.toObject();

  //     return createdTask;
  //   };

  change = async (id, data) => {
    const item = await modelItem.findByIdAndUpdate(id, data, {
      new: true,
      // runValidators: true,
      select: "-createdAt -updatedAt -__v",
    });

    if (!item) {
      throw HttpError(400, "Unable to find Task");
    }

    return item;
  };

  //   changeCategory = async (id, data) => {
  //     const task = await modelTask.findByIdAndUpdate(id, data, {
  //       new: true,
  //       select: "-createdAt -updatedAt -__v",
  //     });

  //     if (!task) {
  //       throw HttpError(400, "Unable to find Task");
  //     }

  //     return task;
  //   };

  //   remove = async (id) => {
  //     const task = await modelTask.findByIdAndDelete(id, {
  //       select: "-createdAt -updatedAt -__v",
  //     });

  //     if (!task) {
  //       throw HttpError(400, "Unable to find Task");
  //     }

  //     return task;
  //   };
}

const itemServices = new ItemServices();
module.exports = itemServices;
