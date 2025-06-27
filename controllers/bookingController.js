// ===========================WITH MAIL TRAP=========================

// const Booking = require("../models/booking");
// const Flight = require("../models/Flight");

// const createBooking = async (req, res) => {
//   try {
//     console.log("Incoming Booking Request:", req.body);

//     const {
//       departureFlightId,
//       returnFlightId, // optional for one-way

//       // passengerName,
//       firstName,
//       lastName,
//       age,
//       gender,
//       email,
//       phone,
//       seatClass,

//       travelers = { adults: 1, children: 0, lapInfants: 0 }
//     } = req.body;

//     // ✅ Fetch departure flight
//     const departureFlight = await Flight.findById(departureFlightId);
//     if (!departureFlight) {
//       return res.status(404).json({
//         status: "error",
//         message: "Departure flight not found",
//       });
//     }

//     // ✅ Fetch return flight if roundtrip
//     let returnFlight = null;
//     if (returnFlightId) {
//       returnFlight = await Flight.findById(returnFlightId);
//       if (!returnFlight) {
//         return res.status(404).json({
//           status: "error",
//           message: "Return flight not found",
//         });
//       }
//     }


//     // ✅ Price calculation

//     /*

//     🎫 Final Fare Formula per Passenger Type:
//     ----------------------------------------------------------------------------
//     Passenger Type	   Economy	    Business	          First Class
//     ----------------------------------------------------------------------------
//     Adult (12+)	       base × 1	    base × 1.5	        base × 2
//     Child (2–11)	     base × 0.7	  base × 0.7 × 1.5	  base × 0.7 × 2
//     Lap Infant (<2)	   base × 0.1	  base × 0.1 × 1.5	  base × 0.1 × 2
//     ----------------------------------------------------------------------------
//     */

//     const calculatePrice = (flight, seatClass) => {
//       const base = flight.basePrice;
//       const discount = flight.discountPercent || 0;

//       // 🔁 Adjust multiplier based on seat class
//       let multiplier = 1; // Economy default
//       if (seatClass === "Business") multiplier = 1.5;
//       else if (seatClass === "First") multiplier = 2;

//       const adult = (travelers.adults || 0) * base * multiplier;
//       const child = (travelers.children || 0) * base * 0.7 * multiplier;
//       const infant = (travelers.lapInfants || 0) * base * 0.1 * multiplier;

//       const total = (adult + child + infant) * (1 - discount / 100);
//       return total;
//     };

//     const totalPrice = Math.round(
//       calculatePrice(departureFlight, seatClass) +
//       (returnFlight ? calculatePrice(returnFlight, seatClass) : 0)
//     );
    
//     console.log("➡️ Seat Class:", seatClass);
//     console.log("➡️ Base Price:", departureFlight.basePrice);
//     console.log("➡️ Total Price:", totalPrice);


//     //--------------------------
// /*

// // Destructure counts for clarity
// const { adults = 0, children = 0, lapInfants = 0 } = travelers;
// const multiplier = seatClass === "Business" ? 1.5 : seatClass === "First" ? 2 : 1;

// console.log("🎟️ Passenger Fare Breakdown");
// console.log("➡️ Seat Class:", seatClass);
// console.log("➡️ Base Price:", departureFlight.basePrice);
// console.log(`➡️ Multiplier (${seatClass}): ×${multiplier}`);

// console.log(`👨 Adults (${adults}): ${adults} × base × 1 × ${multiplier} = ${adults * departureFlight.basePrice * 1 * multiplier}`);
// console.log(`🧒 Children (${children}): ${children} × base × 0.7 × ${multiplier} = ${children * departureFlight.basePrice * 0.7 * multiplier}`);
// console.log(`👶 Infants (${lapInfants}): ${lapInfants} × base × 0.1 × ${multiplier} = ${lapInfants * departureFlight.basePrice * 0.1 * multiplier}`);

// console.log(`➡️ Total Before Discount: ${(
//   (adults * departureFlight.basePrice * 1 * multiplier) +
//   (children * departureFlight.basePrice * 0.7 * multiplier) +
//   (lapInfants * departureFlight.basePrice * 0.1 * multiplier)
// ).toFixed(2)}`);

// console.log(`🎯 Final Total Price After Discount: ₹${totalPrice}`);

// */
//     //--------------------------------------

//     // ✅ Create booking
//     const booking = new Booking({
//       departureFlight: departureFlightId,
//       returnFlight: returnFlightId || null,
//       // passengerName,
//       firstName,
//       lastName,
//       age,
//       gender,
//       email,
//       phone,
//       seatClass,
//       travelers,
//       price: totalPrice,
//     });

//     console.log("➡️ Final Price Saved:", totalPrice);

//     await booking.save();

//     res.status(201).json({
//       status: "success",
//       message: "Booking created successfully",
//       data: booking,
//     });
//   } catch (err) {
//     console.error("Booking error:", err);
//     res.status(500).json({
//       status: "error",
//       message: err.message || "Internal Server Error",
//     });
//   }
// };


// const getAllBookings = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 10;
//     const skip = (page - 1) * perPage;

//     // ✅ Get total count first
//     const totalCount = await Booking.countDocuments();

//     // ✅ Fetch paginated data with populate
//     const bookings = await Booking.find()
//       .skip(skip)
//       .limit(perPage)
//       .populate("departureFlight")
//       .populate("returnFlight");

//     // ✅ Calculate total pages
//     const totalPages = Math.ceil(totalCount / perPage);

//     // ✅ Standard Success Response
//     res.status(200).json({
//       status: "success",
//       message: "Bookings fetched successfully",
//       currentPage: page,
//       perPage: perPage,
//       totalPages: totalPages,
//       totalCount: totalCount,
//       data: bookings,
//     });
//   } catch (err) {
//     res.status(500).json({ status: "error", message: err.message });
//   }
// };

// const getBookingById = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id)
//       .populate("departureFlight")
//       .populate("returnFlight");

//     if (!booking) {
//       return res.status(404).json({
//         status: "error",
//         message: "Booking not found",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       message: "Booking fetched successfully",
//       data: booking,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: err.message || "Internal server error",
//     });
//   }
// };


// module.exports = { createBooking, getAllBookings, getBookingById };




//============================WITH MAIL TRAP==============================================



// All booking details are stored in MongoDB ✅ (already done).
// A booking email is sent to your email (backend.9developer@gmail.com) ✅





const Booking = require("../models/booking");
const Flight = require("../models/Flight");
require("dotenv").config();
const { Resend } = require("resend");


const resend = new Resend(process.env.RESEND_API_KEY);

const createBooking = async (req, res) => {
  try {
    console.log("Incoming Booking Request:", req.body);

    const {
      departureFlightId,
      returnFlightId,
      firstName,
      lastName,
      age,
      gender,
      email,
      phone,
      seatClass,
      travelers = { adults: 1, children: 0, lapInfants: 0 }
    } = req.body;

    const departureFlight = await Flight.findById(departureFlightId);
    if (!departureFlight) {
      return res.status(404).json({ status: "error", message: "Departure flight not found" });
    }

    let returnFlight = null;
    if (returnFlightId) {
      returnFlight = await Flight.findById(returnFlightId);
      if (!returnFlight) {
        return res.status(404).json({ status: "error", message: "Return flight not found" });
      }
    }

    const calculatePrice = (flight, seatClass) => {
      const base = flight.basePrice;
      const discount = flight.discountPercent || 0;
      let multiplier = 1;
      if (seatClass === "Business") multiplier = 1.5;
      else if (seatClass === "First") multiplier = 2;

      const adult = (travelers.adults || 0) * base * multiplier;
      const child = (travelers.children || 0) * base * 0.7 * multiplier;
      const infant = (travelers.lapInfants || 0) * base * 0.1 * multiplier;

      const total = (adult + child + infant) * (1 - discount / 100);
      return total;
    };

    const totalPrice = Math.round(
      calculatePrice(departureFlight, seatClass) +
      (returnFlight ? calculatePrice(returnFlight, seatClass) : 0)
    );

    const booking = new Booking({
      departureFlight: departureFlightId,
      returnFlight: returnFlightId || null,
      firstName,
      lastName,
      age,
      gender,
      email,
      phone,
      seatClass,
      travelers,
      price: totalPrice,
    });

    await booking.save();

    // ✅ Format booking details
    const bookingDetails = `
      <h2>✈️ New Booking Received</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Gender:</strong> ${gender}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Seat Class:</strong> ${seatClass}</p>
      <p><strong>Total Travelers:</strong> 
        👨 Adults: ${travelers.adults || 0} |
        🧒 Children: ${travelers.children || 0} |
        👶 Infants: ${travelers.lapInfants || 0}
      </p>
      <p><strong>Departure Flight:</strong> ${departureFlight.from} → ${departureFlight.to} (${departureFlight.flightNumber})</p>
      ${returnFlight ? `<p><strong>Return Flight:</strong> ${returnFlight.from} → ${returnFlight.to} (${returnFlight.flightNumber})</p>` : ""}
      <p><strong>Total Price:</strong> ₹${totalPrice}</p>
    `;

    // ✅ Send to your email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "backend.9developer@gmail.com",
      subject: "🛬 New Booking Notification",
      html: bookingDetails,
    });

    // ✅ Send confirmation to user
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "✅ Booking Confirmation",
      html: `
        <h2>Thanks for Booking with Us, ${firstName}!</h2>
        <p>Your flight has been successfully booked.</p>
        <p><strong>Total Amount:</strong> ₹${totalPrice}</p>
        <p>We will contact you shortly with more details.</p>
        <hr />
        <p>Safe travels! 🛫</p>
      `
    });

    res.status(201).json({
      status: "success",
      message: "Booking created and confirmation emails sent",
      data: booking,
    });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};


const getAllBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    // ✅ Get total count first
    const totalCount = await Booking.countDocuments();

    // ✅ Fetch paginated data with populate
    const bookings = await Booking.find()
      .skip(skip)
      .limit(perPage)
      .populate("departureFlight")
      .populate("returnFlight");

    // ✅ Calculate total pages
    const totalPages = Math.ceil(totalCount / perPage);

    // ✅ Standard Success Response
    res.status(200).json({
      status: "success",
      message: "Bookings fetched successfully",
      currentPage: page,
      perPage: perPage,
      totalPages: totalPages,
      totalCount: totalCount,
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("departureFlight")
      .populate("returnFlight");

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Internal server error",
    });
  }
};

module.exports = { createBooking, getAllBookings, getBookingById };



//==================================MAIL TRAP NODEMAILER===========

/*
require("dotenv").config();
const nodemailer = require("nodemailer");
const Flight = require("../models/Flight");
const Booking = require("../models/Booking");

// ✅ Mailtrap SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const createBooking = async (req, res) => {
  try {
    const {
      departureFlightId,
      returnFlightId,
      firstName,
      lastName,
      age,
      gender,
      email,
      phone,
      seatClass,
      travelers = { adults: 1, children: 0, lapInfants: 0 }
    } = req.body;

    const departureFlight = await Flight.findById(departureFlightId);
    if (!departureFlight) {
      return res.status(404).json({ status: "error", message: "Departure flight not found" });
    }

    let returnFlight = null;
    if (returnFlightId) {
      returnFlight = await Flight.findById(returnFlightId);
      if (!returnFlight) {
        return res.status(404).json({ status: "error", message: "Return flight not found" });
      }
    }

    const calculatePrice = (flight, seatClass) => {
      const base = flight.basePrice;
      const discount = flight.discountPercent || 0;
      let multiplier = seatClass === "Business" ? 1.5 : seatClass === "First" ? 2 : 1;

      const adult = (travelers.adults || 0) * base * multiplier;
      const child = (travelers.children || 0) * base * 0.7 * multiplier;
      const infant = (travelers.lapInfants || 0) * base * 0.1 * multiplier;

      return (adult + child + infant) * (1 - discount / 100);
    };

    const totalPrice = Math.round(
      calculatePrice(departureFlight, seatClass) +
      (returnFlight ? calculatePrice(returnFlight, seatClass) : 0)
    );

    const booking = new Booking({
      departureFlight: departureFlightId,
      returnFlight: returnFlightId || null,
      firstName,
      lastName,
      age,
      gender,
      email,
      phone,
      seatClass,
      travelers,
      price: totalPrice,
    });

    await booking.save();

    // 📩 Email content (admin + user)
    const bookingDetails = `
      <h2>✈️ New Booking Received</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Gender:</strong> ${gender}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Seat Class:</strong> ${seatClass}</p>
      <p><strong>Total Travelers:</strong> 
        👨 Adults: ${travelers.adults || 0} |
        🧒 Children: ${travelers.children || 0} |
        👶 Infants: ${travelers.lapInfants || 0}
      </p>
      <p><strong>Departure Flight:</strong> ${departureFlight.from} → ${departureFlight.to} (${departureFlight.flightNumber})</p>
      ${returnFlight ? `<p><strong>Return Flight:</strong> ${returnFlight.from} → ${returnFlight.to} (${returnFlight.flightNumber})</p>` : ""}
      <p><strong>Total Price:</strong> ₹${totalPrice}</p>
    `;

    // ✅ 1. Send to admin
    await transporter.sendMail({
      from: '"Flight System" <booking@yourdomain.com>',
      to: "backend.9developer@gmail.com",
      subject: "🛬 New Booking Notification",
      html: bookingDetails,
    });

    // ✅ 2. Send confirmation to user
    await transporter.sendMail({
      from: '"Flight Booking" <booking@yourdomain.com>',
      to: email,
      subject: "✅ Booking Confirmation",
      html: `
        <h2>Thanks for Booking with Us, ${firstName}!</h2>
        <p>Your flight has been successfully booked.</p>
        <p><strong>Total Amount:</strong> ₹${totalPrice}</p>
        <p>Seat Class: ${seatClass}</p>
        <p>We will contact you shortly with more details.</p>
        <hr />
        <p>Safe travels! 🛫</p>
      `,
    });

    res.status(201).json({
      status: "success",
      message: "Booking created and confirmation emails sent",
      data: booking,
    });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};
const getAllBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    // ✅ Get total count first
    const totalCount = await Booking.countDocuments();

    // ✅ Fetch paginated data with populate
    const bookings = await Booking.find()
      .skip(skip)
      .limit(perPage)
      .populate("departureFlight")
      .populate("returnFlight");

    // ✅ Calculate total pages
    const totalPages = Math.ceil(totalCount / perPage);

    // ✅ Standard Success Response
    res.status(200).json({
      status: "success",
      message: "Bookings fetched successfully",
      currentPage: page,
      perPage: perPage,
      totalPages: totalPages,
      totalCount: totalCount,
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("departureFlight")
      .populate("returnFlight");

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Internal server error",
    });
  }
};

module.exports = { createBooking, getAllBookings, getBookingById };

*/
