const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", dealSchema);

