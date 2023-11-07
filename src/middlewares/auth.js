const { HttpError, getPayloadAccessToken } = require("../helpers");
const { modelUser } = require("../models/user");
const usersServices = require("../service/users");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = getPayloadAccessToken(token);
    const user = await modelUser.findById(id);
    if (!user || !user.accessToken || user.accessToken !== token) {
      next(HttpError(401));
    }

    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

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

module.exports = { auth, isEmailUnique };
