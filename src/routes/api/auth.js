const express = require("express");
const {
  validateBody,
  auth,
  uploadCloud,
  //   passport,
} = require("../../middlewares/index");

const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/ctrlUsers");

const router = express.Router();

router.get("/current", auth, ctrl.currentUser);
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.get("/verify/:token", ctrl.verifyEmail);
router.post("/verify", ctrl.sendVerify);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/refresh", validateBody(schemas.refreshSchema), ctrl.refresh);
router.post("/logout", auth, ctrl.logout);
router.post("/forgot", ctrl.forgotPassword);
router.post("/reset-password", ctrl.resetPassword);
router.patch(
  "/update",
  auth,
  uploadCloud.single("photo"),
  validateBody(schemas.updateUserSchema),
  ctrl.updateUser
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
