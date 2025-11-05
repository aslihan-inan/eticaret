import express from "express";
import cors from "cors";
import productRoutes from "../eticaret-backend/routes/productRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://eticaret-26.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/products", productRoutes);

// ✅ Vercel için handler export
export default app;
