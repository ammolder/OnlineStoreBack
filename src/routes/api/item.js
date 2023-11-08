const express = require("express");

const {
  getAllItems,
  getItemById,
  updateItem,
  changeStatus,
  createItem,
  deleteItem,
} = require("../../controllers/ctrlItems");
const { validateBody, isValidId, auth } = require("../../middlewares");
const { addItemVldtr, changeStatusItemVldtr } = require("../../validators/itemVldtr");

const router = express.Router();

router.get("/", getAllItems);

router.get("/:itemId", isValidId, getItemById);

router.post("/", auth, validateBody(addItemVldtr), createItem);
router.put(
  "/:itemId",
  auth,
  isValidId,
  validateBody(addItemVldtr),
  updateItem,
);
router.patch(
  "/:itemId/status",
  auth,
  isValidId,
  validateBody(changeStatusItemVldtr),
  changeStatus,
);

router.delete("/:itemId", auth, isValidId, deleteItem);

module.exports = router;
