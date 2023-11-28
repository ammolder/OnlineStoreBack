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
  createItem
);
router.put(
  "/:itemId",
  checkAccessToken,
  isValidId,
  isUserVerified,
  validateBody(addItemVldtr),
  isItemExists,
  isItemYours,
  updateItem
);
router.patch(
  "/:itemId/status",
  checkAccessToken,
  isValidId,
  isUserVerified,
  validateBody(changeStatusItemVldtr),
  isItemExists,
  isItemYours,
  changeStatus
);

router.delete(
  "/:itemId",
  checkAccessToken,
  isUserVerified,
  isValidId,
  isItemExists,
  isItemYours,
  deleteItem
);

module.exports = router;
