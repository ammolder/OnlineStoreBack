const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { v4 } = require("uuid");
const { modelUser } = require("../models/user");
const usersServices = require("../service/users");

const {
  HttpError,
  createPairToken,
  getPayloadRefreshToken,
  sendMail,
} = require("../helpers");

const { templateMailForgotPassword } = require("../templates");
const { schemas } = require("../models/user");

const { FRONTEND_URL, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env; //For google autanticate

const currentUser = async (req, res, next) => {
  const { name, email, phone, birthday, avatarUrl } = req.user;

  res.status(200).json({
    name,
    email,
    phone,
    birthday,
    avatarUrl,
  });
};

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await usersServices.findUser({ email }, false);

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await usersServices.createUser({
    ...req.body,
    password: hashPassword,
  });

  const [accessToken, refreshToken] = createPairToken({ id: newUser._id });

  await usersServices.updateUserById(newUser._id, {
    accessToken,
    refreshToken,
  });

  const {
    password: _password,
    token: _token,
    accessToken: _accessToken,
    refreshToken: _refreshToken,
    verificationToken,
    ...updatedUser
  } = newUser.toObject();

  res.json({
    accessToken,
    refreshToken,
    user: updatedUser,
  });
};

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  const { email } = req.body;
  const userByEmail = await usersServices.findUser({ email }, false);

  if (userByEmail && String(userByEmail._id) !== String(_id)) {
    throw HttpError(409, "Email is not compare");
  }

  const avatarUrl = req.file?.path;

  const updatedFields = {
    ...req.body,
    ...(avatarUrl && { avatarUrl: avatarUrl }), // add avatarUrl if it's defined
  };

  const user = await usersServices.updateUserById(_id, updatedFields, false);

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const { token, password, verificationToken, ...updatedUser } =
    user.toObject();

  res.status(200).json({ message: "UserInfo updated", user: updatedUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersServices.findUser({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const [accessToken, refreshToken] = createPairToken({ id: user._id });

  await usersServices.updateUserById(user._id, { accessToken, refreshToken });

  const {
    password: _password,
    token: _token,
    verificationToken,
    accessToken: _accessToken,
    refreshToken: _refreshToken,
    ...updatedUser
  } = user.toObject();

  res.json({
    accessToken,
    refreshToken,
    user: updatedUser,
  });
};

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;

  const { id } = getPayloadRefreshToken(token);

  const user = await usersServices.findUser({ refreshToken: token }, false);

  if (!user) {
    throw HttpError(403, "Invalid refresh token");
  }

  const [accessToken, refreshToken] = createPairToken({ id });

  await usersServices.updateUserById(user._id, {
    accessToken,
    refreshToken,
  });

  res.json({ accessToken, refreshToken });
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    throw HttpError(400, "Token and new password are required");
  }
  const decoded = jwt.verify(token, ACCESS_SECRET_KEY);
  const user = await usersServices.updateUserById({
    _id: decoded.id,
    resetPasswordToken: token,
  });

  if (!user) {
    throw HttpError(400, "Token is invalid or has expired");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;

  await user.save();

  res.status(200).json({ message: "Password reset successful." });
};

const forgotPassword = async (req, res) => {};

const logout = async (req, res) => {
  const { _id } = req.user;
  await usersServices.updateUserById(_id, {
    accessToken: "",
    refreshToken: "",
  });

  res.status(204).json("Successful logout");
};
//forgotPassword
module.exports = {
  currentUser,
  register,
  updateUser,
  login,
  refresh,
  forgotPassword,
  resetPassword,
  logout,
};