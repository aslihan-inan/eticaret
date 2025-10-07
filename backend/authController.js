const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Örnek users array (in-memory, gerçek projede DB olmalı)
const users = [];

// Örnek roles array
const roles = [
  { id: 1, name: "Customer" },
  { id: 2, name: "Store" },
  { id: 3, name: "Admin" }
];

// -----------------
// Signup endpoint
// -----------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role_id, store } = req.body;

    // Kullanıcı zaten var mı kontrol
    const exists = users.find(u => u.email === email);
    if (exists) return res.status(400).json({ message: "Email zaten kayıtlı" });

    // Şifre hash
    const passwordHash = await bcrypt.hash(password, 10);

    // Yeni kullanıcı objesi
    const newUser = {
      id: users.length + 1,
      name,
      email,
      passwordHash,
      role_id,
      store: store || null
    };

    users.push(newUser);

    // Signup response: id, name, email
    res.status(201).json({ 
      message: "Kullanıcı oluşturuldu", 
      user: { id: newUser.id, name: newUser.name, email: newUser.email } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
});

// -----------------
// Login endpoint
// -----------------
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: "Email veya şifre hatalı" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Email veya şifre hatalı" });

    // Token oluştur
    const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });

    // Login response: token + user info (id, name, email)
    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

// -----------------
// Roles endpoint
// -----------------
router.get("/roles", (req, res) => {
  res.json(roles);
});

module.exports = router;
