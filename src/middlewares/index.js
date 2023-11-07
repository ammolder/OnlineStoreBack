const auth = require("./auth");
const sendMail = require("./sendMail");
const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const uploadCloud = require("./uploadCloud");

module.exports = { auth, sendMail, validateBody, isValidId, uploadCloud };
