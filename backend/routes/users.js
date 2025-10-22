// örnek Express.js
const express = require("express");
const router = express.Router();

// Kullanıcının kartlarını çek
router.get("/card", async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user.id });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Kullanıcının adreslerini çek
router.get("/address", async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
