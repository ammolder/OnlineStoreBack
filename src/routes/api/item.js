const express = require("express");

const {
  getAllItems,
  getItemById,
  updateItem,
  changeStatus,
  createItem,
  deleteItem,
} = require("../../controllers/ctrlItems");
const { validateBody, isValidId, checkAccessToken } = require("../../middlewares");
const { addItemVldtr, changeStatusItemVldtr } = require("../../validators/itemVldtr");

const router = express.Router();

router.get("/", getAllItems);

router.get("/:itemId", isValidId, getItemById);

router.post("/", checkAccessToken, validateBody(addItemVldtr), createItem);
router.put(
  "/:itemId",
  checkAccessToken,
  isValidId,
  validateBody(addItemVldtr),
  updateItem,
);
router.patch(
  "/:itemId/status",
  checkAccessToken,
  isValidId,
  validateBody(changeStatusItemVldtr),
  changeStatus,
);

router.delete("/:itemId", checkAccessToken, isValidId, deleteItem);

module.exports = router;
