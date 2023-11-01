const jwt = require("jsonwebtoken");
const { HttpError, getPayloadAccessToken } = require("../helpers");
const { modelUser } = require("../models/user");

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
      next(HttpError(401, message));
    }

    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = auth;
