const usersServices = require("../service/users");
const { HttpError } = require("../helpers");

const isEmailNotVerified = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { verified, verificationToken } = await usersServices.findUser({ email });

    if (verified) {
      return next(HttpError(400, "Verification has already been passed"));
    }

    req.verificationToken = verificationToken;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = isEmailNotVerified;
