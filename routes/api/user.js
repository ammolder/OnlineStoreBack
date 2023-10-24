const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.get("/:itemId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:itemId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:itemId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
