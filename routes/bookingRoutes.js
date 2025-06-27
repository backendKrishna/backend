const express = require("express");
const router = express.Router();
const { createBooking, getAllBookings,getBookingById } = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);


module.exports = router;