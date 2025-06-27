const mongoose = require("mongoose");
const Flight = require("./Flight");

const bookingSchema = new mongoose.Schema({
  // flight: { type: mongoose.Schema.Types.ObjectId, ref: "Flight" },

  departureFlight: { type: mongoose.Schema.Types.ObjectId, ref: "Flight" },
  returnFlight: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", default: null },
  firstName: String,
  lastName: String,
  age: Number,
  gender: String,
  email: String,
  phone: String,
  seatClass: { type: String, enum: ["Economy", "Premium Economy","Business", "First"], default: "Economy" },
  travelers: {
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    lapInfants: { type: Number, default: 0 },
  },
  // price: Number,
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// ✅ Add index for fast user-based booking lookups
bookingSchema.index({ email: 1 });

// 🔁 Pre-save hook to calculate total price   //using the pre-save hook for price calculation, you can skip price calc in controller 


bookingSchema.pre("save", async function (next) {
  const booking = this;

  try {
    const departure = await Flight.findById(booking.departureFlight);
    if (!departure) return next(new Error("Departure flight not found"));

    let totalPrice = 0;

    const getSeatMultiplier = (seatClass) => {
      switch (seatClass) {
        // case "Business":
        //   return 1.5;
        // case "First":
        //   return 2;
        // default:
        //   return 1; // Economy

        case "Premium Economy":
          return 1.2;
        case "Business":
          return 1.5;
        case "First":
          return 2;
        default:
          return 1; // Economy
      }
    };

    const calcPrice = (flight) => {
      const base = flight.basePrice;
      const discount = flight.discountPercent || 0;
      const multiplier = getSeatMultiplier(booking.seatClass); // ✅ Use booking.seatClass

      const adults = (booking.travelers.adults || 0) * base * 1 * multiplier;
      const children = (booking.travelers.children || 0) * base * 0.7 * multiplier;
      const infants = (booking.travelers.lapInfants || 0) * base * 0.1 * multiplier;

      const total = (adults + children + infants) * (1 - discount / 100);
      return total;
    };

    totalPrice += calcPrice(departure);

    if (booking.returnFlight) {
      const returnFlight = await Flight.findById(booking.returnFlight);
      if (!returnFlight) return next(new Error("Return flight not found"));
      totalPrice += calcPrice(returnFlight);
    }

    booking.price = Math.round(totalPrice);
    console.log("✅ Final Price Calculated in Mongoose Hook:", booking.price);

    next();
  } catch (err) {
    next(err);
  }
});


// ✅ Export model after all hooks are registered
module.exports = mongoose.model("Booking", bookingSchema);

