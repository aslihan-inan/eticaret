import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

const app = express();

// ✅ CORS'u en üste koy
app.use(
  cors({
    origin: ["http://localhost:5173", "https://eticaret-26.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/products", productRoutes);

// ✅ Test
app.get("/", (req, res) => {
  res.send("API is working ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
