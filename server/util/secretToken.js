require("dotenv").config();
const jwt = require("jsonwebtoken");

const { token_key } = process.env;

module.exports.createSecretToken = id => {
  return jwt.sign({ id }, token_key, {
    expiresIn: 3 * 24 * 60 * 60
  });
};
