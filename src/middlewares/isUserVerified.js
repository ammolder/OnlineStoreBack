const usersServices = require("../service/users");
const { HttpError } = require("../helpers");

const isUserVerified = async (req, res, next) => {
  try {
    const { verified } = req.user;

    if (!verified) {
      return next(HttpError(400, "user is not verified"));
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = isUserVerified;
