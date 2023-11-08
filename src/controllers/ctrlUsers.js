const { v4 } = require("uuid");

const usersServices = require("../service/users");
const {
  HttpError,
  createPairToken,
  hashPassword,
  getPayloadActionToken,
} = require("../helpers");
const { sendMail } = require("../middlewares");

const currentUser = async (req, res) => {
  const { name, email, phone, birthday, avatarUrl, verified } = req.user;

  res.status(200).json({
    name,
    email,
    phone,
    birthday,
    avatarUrl,
    verified,
  });
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const verificationToken = v4();

    const hashedPassword = await hashPassword(password);

    const newUser = await usersServices.createUser({
      ...req.body,
      password: hashedPassword,
      verificationToken,
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
      verificationToken: _verificationToken,
      ...updatedUser
    } = newUser.toObject();

    await sendMail({
      to: email,
      subject: "Please confirm your email",
      html: `<a href='http://localhost:3000/api/user/verify/${verificationToken}'>Confirm your email</a>`,
    });

    res.json({
      accessToken,
      refreshToken,
      user: updatedUser,
    });
  } catch (e) {
    next(e);
  }
};

const verifyEmail = async (req, res, next) => {
  const { token } = req.params;
  const user = await usersServices.findUser({ verificationToken: token });

  if (!user) {
    throw HttpError(404, "Not found");
  }

  await usersServices.updateUserById(user._id, {
    verified: true,
    verificationToken: null,
  });
  console.log("token :", token);

  return res.status(200).json("Verification successful");
};

const sendVerify = async (req, res, next) => {
  const { email } = req.body;
  const user = await usersServices.findUser({ email });
  const verificationToken = user.verificationToken;

  if (!user) {
    throw HttpError(400, "missing required field email");
  }

  if (user.verified) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendMail({
    to: email,
    subject: "Please confirm your email",
    html: `<a href='http://localhost:3000/api/user/verify/${verificationToken}'>Confirm your email</a>`,
  });
  console.log("verified :", user.verified);

  return res.status(200).json("Verification email sent");
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
    ...(avatarUrl && { avatarUrl }), // add avatarUrl if it's defined
  };

  const user = await usersServices.updateUserById(_id, updatedFields, false);

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const { token, password, verificationToken, ...updatedUser } =
    user.toObject();

  res.status(200).json({ message: "UserInfo updated", user: updatedUser });
};

const login = async (req, res, next) => {
  try {
    const { user } = req;

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
  } catch (e) {
    next(e);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshPayloadId, user } = req;

    const [accessToken, refreshToken] = createPairToken({ id: refreshPayloadId });

    await usersServices.updateUserById(user._id, {
      accessToken,
      refreshToken,
    });

    res.json({ accessToken, refreshToken });
  } catch (e) {
    next(e);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const { id } = getPayloadActionToken(token);

    const user = await usersServices.updateUserById(id, {
      resetPasswordToken: token,
    });

    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (e) {
    next(e);
  }
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
// forgotPassword
module.exports = {
  currentUser,
  register,
  sendVerify,
  verifyEmail,
  updateUser,
  login,
  refresh,
  forgotPassword,
  resetPassword,
  logout,
};
