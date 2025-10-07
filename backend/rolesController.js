// rolesController.js
const express = require("express");
const router = express.Router();

// Roller array olarak
const roles = [
  { id: 1, name: "Customer" },
  { id: 2, name: "Store" },
  { id: 3, name: "Admin" }
];

// GET /api/roles
router.get("/roles", (req, res) => {
  res.json(roles); // array olarak dönüyor
});

module.exports = router;
