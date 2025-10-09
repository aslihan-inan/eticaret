const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const users = [
  {
    id: 1,
    email: "customer@commerce.com",
    passwordHash: bcrypt.hashSync("123456", 10),
  },
];

const userCartData = [{ productId: 1, quantity: 2 }];
const userCardData = [{ cardNumber: "1234-5678-9012-3456", expiry: "12/26" }];

router.get("/cart", (req, res) => {
  // Burada DB’den sepeti çek veya mock data döndür
  const cart = [
    { id: 1, product: "Ürün A", quantity: 2, price: 50 },
    { id: 2, product: "Ürün B", quantity: 1, price: 30 },
  ];
  res.json(cart);
});

// Örnek: Kartları getirme
router.get("/card", (req, res) => {
  // Burada DB’den kart bilgilerini çek veya mock data döndür
  const cards = [
    { id: 1, number: "**** **** **** 1234", type: "Visa" },
    { id: 2, number: "**** **** **** 5678", type: "Mastercard" },
  ];
  res.json(cards);
});


module.exports = { router, users };
