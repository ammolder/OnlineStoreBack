const { HttpError, comparePasswords } = require("../helpers");
const usersServices = require("../service/users");

const isPasswordsSame = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await usersServices.findUser({ email });

    const passwordCompare = await comparePasswords(password, user.password);
    if (!passwordCompare) {
      return next(HttpError(401, "Email or password invalid"));
    }

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = isPasswordsSame;
