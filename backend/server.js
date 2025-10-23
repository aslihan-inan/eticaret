
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', "https://eticaret-nine.vercel.app" ],
  credentials: true
}));
app.use(express.json());

const userRoutes = require("./routes/users"); // ✅ doğru dosya yolu
const productRoutes = require("./routes/productRoutes");

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => res.send("API is running ✅"));

app.use((req, res) => res.status(404).json({ message: "Not Found" }));

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
