const express = require("express");

const {
  validateBody,
  uploadCloud,
  //   passport,
} = require("../../middlewares");
const { auth, isEmailUnique } = require("../../middlewares/auth");
const ctrl = require("../../controllers/ctrlUsers");
const { registerVldtr, loginVldtr, refreshVldtr, updateUserVldtr } = require("../../validators/userVldtr");

const router = express.Router();

router.get("/current", auth, ctrl.currentUser);
router.post("/register", validateBody(registerVldtr), isEmailUnique, ctrl.register);
router.post("/login", validateBody(loginVldtr), ctrl.login);
router.post("/refresh", validateBody(refreshVldtr), ctrl.refresh);
router.post("/logout", auth, ctrl.logout);
router.post("/forgot", ctrl.forgotPassword);
router.post("/reset-password", ctrl.resetPassword);
router.patch(
  "/update",
  auth,
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
