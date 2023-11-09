const usersServices = require("../service/users");
const { HttpError } = require("../helpers");

const isVerifyTokenValid = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await usersServices.findUser({ verificationToken: token });

    if (!user) {
      return next(HttpError(404, "Not found"));
    }

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = isVerifyTokenValid;
