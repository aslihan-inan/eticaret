export default function handler(req, res) {
  res.status(200).json({
    message: "Vercel backend çalışıyor 🚀",
    products: [
      { id: 1, name: "Test Ürün 1", price: 100 },
      { id: 2, name: "Test Ürün 2", price: 200 },
    ],
  });
}
