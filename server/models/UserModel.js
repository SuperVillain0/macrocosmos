const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide your first name"]
  },
  lastname: {
    type: String,
    required: [true, "Please provide your last name"]
  },
  dob: {
    type: Date,
    required: [true, "Please provide your date of birth"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true
  },
  username: {
    type: String,
    required: [true, "Please provide your username"]
  },
  password: {
    type: String,
    required: [true, "Please provide your password"]
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
