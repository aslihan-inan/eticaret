// backend/routes/productRoutes.js
const express = require("express");
const router = express.Router();

// 🧺 Ürün listesi (sayfalama desteği)
router.get("/", (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  const products = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Ürün ${i + 1}`,
    price: (Math.random() * 500 + 100).toFixed(2),
    image: `https://picsum.photos/seed/${i + 1}/300/300`,
  }));

  const start = (page - 1) * limit;
  const paginated = products.slice(start, start + Number(limit));
  res.json({
    page: Number(page),
    limit: Number(limit),
    total: products.length,
    products: paginated,
  });
});

module.exports = router;
