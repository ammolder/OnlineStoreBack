const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const dateRegexp =
  /^(?:(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20)\d\d)?$/;
const phoneRegexp = /^[\+\d]?(?:[\d-.\s()]*)$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    birthday: {
      type: String,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false },
  { timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().allow("").pattern(phoneRegexp).optional(),
  birthday: Joi.string().allow("").pattern(dateRegexp).optional(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().allow("").pattern(phoneRegexp).optional(),
  email: Joi.string().pattern(emailRegexp).required(),
  birthday: Joi.string().allow("").pattern(dateRegexp).optional(),
  avatar: Joi.any().optional(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  refreshSchema,
  emailSchema,
  //   forgotPassword
  // resetPassword,
  updateUserSchema,
};

const modelUser = model("user", userSchema);

module.exports = {
  modelUser,
  schemas,
};
