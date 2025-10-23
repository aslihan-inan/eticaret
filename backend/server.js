import express from "express";
import cors from "cors";

const app = express();

// JSON parsing
app.use(express.json());

// 🔹 CORS ayarları
app.use(cors({
  origin: [
    "https://eticaret-26.vercel.app", // Frontend URL
    "http://localhost:5173"           // Local frontend testi için (vite default port)
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // Cookie/session varsa
}));

// ----------------- ROUTES -----------------
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

// Server başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
