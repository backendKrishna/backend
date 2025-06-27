const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airline: String,
  flightNumber: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  basePrice: Number,
  discountPercent: Number,
  stops: Number,
  baggageAllowance: Number,
  // cabinClass: [String],
  // cabinClass: [{ type: String, enum: ["Economy", "Business", "First Class"] }],
  cabinClass: ["Economy", "Premium Economy", "Business","First Class"],

  delayProbability: Number
});

// ✅ Add index for from/to filtering
flightSchema.index({ from: 1, to: 1 });

module.exports = mongoose.model("Flight", flightSchema);
