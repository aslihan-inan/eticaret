import express from "express";
import cors from "cors";
import productRoutes from "../eticaret-backend/routes/productRoutes.js"; // kendi route dosyanın yolu

const app = express();

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://eticaret-26.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/products", productRoutes);

// Vercel için export
export default app;
