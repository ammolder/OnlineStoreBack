const { usersServices } = require("../service");
const { HttpError } = require("../helpers");

const isUserExists = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userInDb = await usersServices.findUserById(userId);

    if (!userInDb) {
      return next(HttpError(404, "User not found"));
    }

    req.user = userInDb;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = isUserExists;
