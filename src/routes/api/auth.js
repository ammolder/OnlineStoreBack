const express = require("express");

const {
  validateBody,
  checkAccessToken,
  uploadCloud,
  isEmailUnique,
  checkRefreshToken,
  isPasswordsSame,
  isEmailNotVerified,
  //   passport,
} = require("../../middlewares");
const ctrl = require("../../controllers/ctrlUsers");
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
router.post("/register", validateBody(registerVldtr), isEmailUnique, ctrl.register);
router.get("/verify/:token", ctrl.verifyEmail);
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

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   ctrl.authGoogle
// );

module.exports = router;
