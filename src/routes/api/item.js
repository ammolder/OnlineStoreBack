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
const { schemas } = require("../../models/item");

const router = express.Router();

router.get("/", getAllItems);

router.get("/:itemId", isValidId, getItemById);

router.post("/", auth, validateBody(schemas.schemaAddItem), createItem);
router.put(
	"/:itemId",
	auth,
	isValidId,
	validateBody(schemas.schemaAddItem),
	updateItem,
);
router.patch(
	"/:itemId/status",
	auth,
	isValidId,
	validateBody(schemas.schemaChangeStatusItem),
	changeStatus,
);

router.delete("/:itemId", auth, isValidId, deleteItem);

module.exports = router;
