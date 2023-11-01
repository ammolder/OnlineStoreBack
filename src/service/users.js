const { modelUser } = require("../models/user");
const { HttpError } = require("../helpers");

class UsersServices {
  findUserById = async (id) => {
    const user = await modelUser.findById(id);

    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }

    return user;
  };

  updateUserById = async (id, data, standartError = true) => {
    const updateUser = await modelUser.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (standartError && !updateUser) {
      throw HttpError(401, "Email or password invalid");
    }

    return updateUser;
  };

  findUser = async (data, standartError = true) => {
    const user = await modelUser.findOne(data);
    if (standartError && !user) {
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
