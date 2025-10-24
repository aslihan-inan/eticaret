// api/products.js
export default function handler(req, res) {
  const { page = 1, limit = 12 } = req.query;

  const products = Array.from({ length: limit }, (_, i) => ({
    id: (page - 1) * limit + i + 1,
    title: `Ürün ${(page - 1) * limit + i + 1}`,
    price: Math.floor(Math.random() * 100) + 1,
    image: "https://via.placeholder.com/150",
  }));

  res.status(200).json({
    page: Number(page),
    totalPages: 5,
    products,
  });
}
