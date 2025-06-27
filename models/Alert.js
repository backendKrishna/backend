// const mongoose = require("mongoose");

// const alertSchema = new mongoose.Schema({
//   userEmail: String,
//   flightQuery: Object
// });

// module.exports = mongoose.model("Alert", alertSchema);



const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  priceBelow: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Alert", alertSchema);
