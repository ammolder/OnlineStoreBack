const { HttpError, getPayloadAccessToken } = require("../helpers");
const { findUserById } = require("../service/users");

const checkAccessToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401, "Invalid header provided"));
  }

  try {
    const { id } = getPayloadAccessToken(token);
    const user = await findUserById(id);

    if (!user || !user.accessToken || user.accessToken !== token) {
      return next(HttpError(401, "User not found"));
    }

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = checkAccessToken;
