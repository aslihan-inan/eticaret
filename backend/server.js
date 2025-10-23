import express from "express";
import cors from "cors";

const app = express();

// ✅ CORS'u en üste taşı
app.use(
  cors({
    origin: ["http://localhost:5173", "https://eticaret-26.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// JSON parsing
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
