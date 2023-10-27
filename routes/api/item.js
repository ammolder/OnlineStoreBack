const express = require("express");

const ctrl = require("../../controllers/ctrlItems");

const router = express.Router();

router.get("/", ctrl.getItems);

router.get("/:itemId", ctrl.getItem);

router.post("/", ctrl.createItem);

router.delete("/:itemId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:itemId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
