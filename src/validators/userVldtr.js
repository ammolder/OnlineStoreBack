const Joi = require("joi");

const { emailRegexp, phoneRegexp, dateRegexp } = require("../constants/constantsRegexp");

const registerVldtr = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().allow("").pattern(phoneRegexp).optional(),
  birthday: Joi.string().allow("").pattern(dateRegexp).optional(),
});
const loginVldtr = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
const refreshVldtr = Joi.object({
  refreshToken: Joi.string().required(),
});

const updateUserVldtr = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().allow("").pattern(phoneRegexp).optional(),
  email: Joi.string().pattern(emailRegexp).required(),
  birthday: Joi.string().allow("").pattern(dateRegexp).optional(),
  avatar: Joi.any().optional(),
});

const emailVldtr = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = {
  registerVldtr,
  loginVldtr,
  refreshVldtr,
  emailVldtr,
  // forgotPassword
  // resetPassword,
  updateUserVldtr,
};
