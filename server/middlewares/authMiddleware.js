const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        return res.json({ status: true, user: user.username });
      } else {
        return res.json({ status: false });
      }
    }
  });
};

module.exports.getList = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (!users) {
      return res.json({
        users: NULL,
        success: false
      });
    }

    res.status(200).json({
      users: users,
      success: true
    });
    next();
  } catch (err) {
    console.error(err);
  }
};
