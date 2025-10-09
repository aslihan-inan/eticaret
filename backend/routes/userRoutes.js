// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();

// 💳 Kart listesi
router.get("/card", (req, res) => {
  const cards = [
    { id: 1, cardNumber: "**** **** **** 1234", expiry: "12/25" },
    { id: 2, cardNumber: "**** **** **** 5678", expiry: "03/27" },
  ];
  res.json(cards);
});

// 🛒 Sepet listesi
router.get("/cart", (req, res) => {
  const cart = [
    { id: 1, name: "Ürün 1", price: 299.99, quantity: 1 },
    { id: 2, name: "Ürün 2", price: 149.5, quantity: 2 },
  ];
  res.json(cart);
});

module.exports = router;
