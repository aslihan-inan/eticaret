const express = require("express");
const router = express.Router();

router.get("/user/card", (req, res) => {
  res.json({ cards: [] });
});

router.get("/user/address", (req, res) => {
  res.json({ addresses: [] });
});

module.exports = router;
