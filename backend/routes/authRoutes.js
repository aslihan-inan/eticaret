const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Auth route çalışıyor ✅" });
  
});
router.post("/login", (req, res) => {
  res.json({ message: "Login OK" });
});


module.exports = router;
