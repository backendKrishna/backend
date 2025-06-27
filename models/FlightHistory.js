// const mongoose = require("mongoose");

// const flightHistorySchema = new mongoose.Schema({
//   flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight" },
//   date: Date,
//   price: Number
// });

// module.exports = mongoose.model("FlightHistory", flightHistorySchema);




// models/flighthistory.js
const mongoose = require("mongoose");

const flightHistorySchema = new mongoose.Schema({
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
  date: { type: Date, default: Date.now },
  price: { type: Number, required: true },
  userEmail: { type: String }, // Optional: store user's email if available
});

module.exports = mongoose.model("FlightHistory", flightHistorySchema);
