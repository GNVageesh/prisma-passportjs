const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// generate the hash
const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  return password;
};

// compare the hash
const compareHash = async (hashed, password) => {
  return bcrypt.compare(hashed, password);
};

// make tokens
const tokensGen = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

module.exports = {
  generateHash,
  compareHash,
  tokensGen
};
