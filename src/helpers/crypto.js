const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  accessExpiresToken,
  refreshExpiresToken,
} = require("../constants/constantsToken");
const HttpError = require("./HttpError");
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
  try {
    return jwt.verify(token, REFRESH_SECRET_KEY);
  } catch (e) {
    throw HttpError(400, "Refresh token not valid");
  }
};

const getPayloadAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_SECRET_KEY);
  } catch {
    throw HttpError(400, "Access token not valid");
  }
};

const getPayloadActionToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_SECRET_KEY);
  } catch {
    throw HttpError(400, "Reset password token is invalid or has expired");
  }
};

const hashPassword = (password) => bcrypt.hash(password, 10);

const comparePasswords = (pass, hashPass) => bcrypt.compare(pass, hashPass);

module.exports = {
  createPairToken,
  getPayloadRefreshToken,
  getPayloadAccessToken,
  hashPassword,
  comparePasswords,
  getPayloadActionToken,
};
