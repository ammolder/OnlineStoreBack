const usersServices = require("../service/users");
const { HttpError } = require("../helpers");

const isEmailUnique = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await usersServices.findUser({ email }, false);

    if (user) {
      return next(HttpError(409, "Email already in use"));
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = isEmailUnique;
