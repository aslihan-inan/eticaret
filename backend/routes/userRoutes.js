const express = require("express");
const router = express.Router();

router.get("/card", (req, res) => {
  res.json({ cards: [] });
});

router.get("/address", (req, res) => {
  res.json({ addresses: [] });
});

module.exports = router;
