const { HttpError, getPayloadRefreshToken } = require("../helpers");
const { findUser } = require("../service/users");

const checkRefreshToken = async (req, res, next) => {
  const { refreshToken: token } = req.body;

  try {
    const { id } = getPayloadRefreshToken(token);

    const user = await findUser({ refreshToken: token }, false);

    if (!user) {
      return next(HttpError(401, "Refresh token not found in database"));
    }

    req.refreshPayloadId = id;
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = checkRefreshToken;
