const express = require("express");

const ctrl = require("../../controllers/ctrlItems");

const { validateBody, isValidId, auth } = require("../../middlewares/index");
const { schemas } = require("../../models/item");

const router = express.Router();

router.get("/", ctrl.getAllItems);

router.get("/:itemId", isValidId, ctrl.getItemById);

router.post("/", auth, validateBody(schemas.schemaAddItem), ctrl.createItem);
router.put(
  "/:itemId",
  auth,
  isValidId,
  validateBody(schemas.schemaAddItem),
  ctrl.updateItem
);
router.patch(
  "/:itemId/status",
  auth,
  isValidId,
  validateBody(schemas.schemaChangeStatusItem),
  ctrl.changeStatus
);

router.delete("/:itemId", auth, isValidId, ctrl.deleteItem);

module.exports = router;
