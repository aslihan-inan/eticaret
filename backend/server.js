const express = require("express");
const cors = require("cors");

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
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Test root
app.get("/", (req, res) => {
  res.send("API is working ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
