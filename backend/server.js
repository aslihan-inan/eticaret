const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes); // ✅ çok önemli

// Root endpoint
app.get("/", (req, res) => res.send("API is running ✅"));

// 404 fallback
app.use((req, res) => res.status(404).json({ message: "Not Found" }));

// Server başlat
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

