const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// In-memory users array
const users = [];
const roles = [
  { id: 1, name: "Customer" },
  { id: 2, name: "Store" },
  { id: 3, name: "Admin" }
];

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role_id, store } = req.body;
    const exists = users.find(u => u.email === email);
    if (exists) return res.status(400).json({ message: "Email zaten kayıtlı" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, name, email, passwordHash, role_id, store: store || null };
    users.push(newUser);

    res.status(201).json({ message: "Kullanıcı oluşturuldu", user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: "Email veya şifre hatalı" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Email veya şifre hatalı" });

    const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

// Roles
router.get("/roles", (req, res) => {
  res.json(roles);
});

module.exports = router;
