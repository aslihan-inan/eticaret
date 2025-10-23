// backend/routes/user.js
const express = require("express");
const router = express.Router();

// Kullanıcının kartlarını çek
router.get("/card", async (req, res) => {
  try {
    const cards = [{ id: 1, name: "Visa", last4: "1234" }];
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Kullanıcının adreslerini çek
router.get("/address", async (req, res) => {
  try {
    const addresses = [{ id: 1, city: "İstanbul", street: "Beşiktaş" }];
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
