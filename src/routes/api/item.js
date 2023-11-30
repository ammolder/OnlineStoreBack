const express = require("express");

const {
  getAllItems,
  getItemById,
  updateItem,
  changeStatus,
  createItem,
  deleteItem,
} = require("../../controllers/ctrlItems");
const {
  validateBody,
  isValidId,
  checkAccessToken,
  isUserVerified,
  isAdmin,
  isItemExists,
  isItemYours,
} = require("../../middlewares");
const {
  addItemVldtr,
  changeStatusItemVldtr,
} = require("../../validators/itemVldtr");

const router = express.Router();

router.get("/", getAllItems);

router.get("/:itemId", isValidId(), isItemExists, getItemById);

router.post(
  "/",
  checkAccessToken,
  isUserVerified,
  validateBody(addItemVldtr),
  isAdmin,
  createItem
);
router.put(
  "/:itemId",
  checkAccessToken,
  isValidId(),
  isUserVerified,
  validateBody(addItemVldtr),
  isAdmin,
  isItemExists,
  isItemYours,
  updateItem
);
router.patch(
  "/:itemId/status",
  checkAccessToken,
  isValidId(),
  isUserVerified,
  validateBody(changeStatusItemVldtr),
  isAdmin,
  isItemExists,
  isItemYours,
  changeStatus
);

router.delete(
  "/:itemId",
  checkAccessToken,
  isUserVerified,
  isValidId(),
  isAdmin,
  isItemExists,
  isItemYours,
  deleteItem
);

module.exports = router;
