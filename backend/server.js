const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // path doğru mu kontrol et

const app = express();

// Middleware
app.use(express.json());

// CORS ayarı
app.use(cors({
  origin: "http://localhost:5173", // frontend port
  credentials: true
}));

// Routes
app.use("/", authRoutes);

// Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
