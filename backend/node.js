import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: ["https://eticaret-26.vercel.app"], // frontend URL
  credentials: true
}));

app.use(express.json());

// Örnek products route
app.get("/api/products", (req, res) => {
  res.json([{ id: 1, name: "Ürün 1", price: 100 }]);
});

app.listen(5000, () => console.log("Server running on port 5000"));
