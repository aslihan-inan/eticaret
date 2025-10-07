const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    email: "customer@commerce.com",
    passwordHash: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
