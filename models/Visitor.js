const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  from: String,
  to: String,
  travelDate: String,
  returnDate: String, // <-- Added for round trips
  tripType: String,
  seatClass: String,
    travelers: {
      adults: { type: Number, default: 1 },
      children: { type: Number, default: 0 },
      lapInfants: { type: Number, default: 0 },
    },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Visitor", visitorSchema);
