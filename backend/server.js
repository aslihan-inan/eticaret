import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// ----------------- MIDDLEWARE -----------------

// JSON parsing
app.use(express.json());

// 🔹 CORS ayarları
app.use(
  cors({
    origin: [
      "https://eticaret-26.vercel.app", // Frontend URL
      "http://localhost:5173",           // Local frontend testi
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Cookie/session varsa
  })
);

// ----------------- ROUTES -----------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

// ----------------- Örnek fallback products route -----------------
// Eğer productRoutes çalışmazsa test için
app.get("/api/products-test", (req, res) => {
  res.json([
    { id: 1, name: "Ürün 1", price: 100 },
    { id: 2, name: "Ürün 2", price: 200 },
  ]);
});

// ----------------- SERVER -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
