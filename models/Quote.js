const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  travelers: { type: Number, required: true },
  destination: { type: String, required: true },
  details: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Quote", QuoteSchema);
