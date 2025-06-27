const mongoose = require("mongoose");

const airportSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  city: { type: String, required: true }
});

// ✅ Add index for better search performance
airportSchema.index({ city: "text", code: "text" });

module.exports = mongoose.model("Airport", airportSchema);
