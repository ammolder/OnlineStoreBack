const jwt = require("jsonwebtoken");
const {
  accessExpiresToken,
  refreshExpiresToken,
} = require("../constants/constantsToken");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const createPairToken = (payload) => {
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: accessExpiresToken,
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: refreshExpiresToken,
  });

  return [accessToken, refreshToken];
};

const getPayloadRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_SECRET_KEY);
};

const getPayloadAccessToken = (token) => {
  return jwt.verify(token, ACCESS_SECRET_KEY);
};

module.exports = {
  createPairToken,
  getPayloadRefreshToken,
  getPayloadAccessToken,
};
