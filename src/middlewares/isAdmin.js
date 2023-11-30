const { HttpError } = require("../helpers");

const isAdmin = async (req, res, next) => {
  const { admin } = req.user;
  try {
    if (!admin) {
      return next(HttpError(403, "You are not allowed to do this action!"));
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = isAdmin;
