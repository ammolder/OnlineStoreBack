const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");
const { emailRegexp } = require("../constants/constantsRegexp");

const userSchema = new Schema(
  {
    admin: {
      type: Boolean,
      default: false,
    },
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
    address: {
      type: String,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
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

const modelUser = model("user", userSchema);

module.exports = { modelUser };
