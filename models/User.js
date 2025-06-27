const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  // password: String, // hashed password
   password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
