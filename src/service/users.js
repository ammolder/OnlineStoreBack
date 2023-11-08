const { modelUser } = require("../models/user");
const { HttpError } = require("../helpers");

class UsersServices {
  findUserById = (id) => modelUser.findById(id);

  updateUserById = async (id, data, standardError = true) => {
    const updateUser = await modelUser.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (standardError && !updateUser) {
      throw HttpError(401, "Email or password invalid");
    }

    return updateUser;
  };

  findUser = async (data, standardError = true) => {
    const user = await modelUser.findOne(data);

    if (standardError && !user) {
      throw HttpError(401, "Email or password invalid");
    }

    return user;
  };

  createUser = async (data) => {
    const newUser = await modelUser.create(data);

    if (!newUser) {
      throw HttpError(400, "Error create user");
    }

    return newUser;
  };
}

const usersServices = new UsersServices();
module.exports = usersServices;
