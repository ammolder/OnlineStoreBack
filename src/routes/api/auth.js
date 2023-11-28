const express = require("express");
const passport = require("passport");

require("../../middlewares/googeleAuthenticate");
const {
  validateBody,
  checkAccessToken,
  uploadCloud,
  isEmailUnique,
  checkRefreshToken,
  isPasswordsSame,
  isEmailNotVerified,
  isVerifyTokenValid,
  isValidId,
  isUserExists,
} = require("../../middlewares");
const ctrl = require("../../controllers/ctrlUsers");
const itemsCtrl = require("../../controllers/ctrlItems");
const {
  registerVldtr,
  loginVldtr,
  refreshVldtr,
  updateUserVldtr,
  resetPassVldtr,
  sendVerifyVldtr,
} = require("../../validators/userVldtr");

const router = express.Router();

router.get("/current", checkAccessToken, ctrl.currentUser);
router.get("/:userId/items", isValidId("userId"), isUserExists, itemsCtrl.getUserItems);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);
router.get(
  "/google-callback",
  passport.authenticate("google", { session: false }),
  ctrl.googleAuth,
);
router.post("/register", validateBody(registerVldtr), isEmailUnique, ctrl.register);
router.get("/verify/:token", isVerifyTokenValid, ctrl.verifyEmail);
router.post("/verify", validateBody(sendVerifyVldtr), isEmailNotVerified, ctrl.sendVerify);
router.post("/login", validateBody(loginVldtr), isPasswordsSame, ctrl.login);
router.post("/refresh", validateBody(refreshVldtr), checkRefreshToken, ctrl.refresh);
router.post("/logout", checkAccessToken, ctrl.logout);
router.post("/forgot", ctrl.forgotPassword);
router.post("/reset-password", validateBody(resetPassVldtr), ctrl.resetPassword);
router.patch(
  "/update",
  checkAccessToken,
  uploadCloud.single("photo"),
  validateBody(updateUserVldtr),
  ctrl.updateUser,
);

module.exports = router;
