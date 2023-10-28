const express = require("express");

const ctrl = require("../../controllers/ctrlItems");

const { validateBody, isValidId } = require("../../middlewares/index");
const { schemas } = require("../../models/item");

const router = express.Router();

router.get("/", ctrl.getAllItems);

router.get("/:itemId", isValidId, ctrl.getItemById);

router.post("/", validateBody(schemas.schemaAddItem), ctrl.createItem);
router.put(
  "/:itemId",
  isValidId,
  validateBody(schemas.schemaAddItem),
  ctrl.updateItem
);
router.patch(
  "/:itemId/status",
  isValidId,
  validateBody(schemas.schemaChangeStatusItem),
  ctrl.changeStatus
);

router.delete("/:itemId", isValidId, ctrl.deleteItem);

module.exports = router;
