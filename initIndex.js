const mongoose = require("mongoose");
const Airport = require("./models/airport");
const Flight = require("./models/Flight");
const Booking = require("./models/booking");

async function initIndexes() {
  try {
    await mongoose.connect("mongodb://localhost:27017/googleflight");
    console.log("✅ DB connected");

    await Airport.syncIndexes();
    await Flight.syncIndexes();
    await Booking.syncIndexes();

    console.log("✅ Indexes created");
    process.exit(); // Exit after completion
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1); // Exit with error
  }
}

initIndexes();

/*
Only run this once — Mongoose automatically ensures indexes at startup, but calling .syncIndexes() once helps confirm.


PS C:\Users\hp\Desktop\OFFICE2\GIT-FLIGHT1\GOOGLE-FLIGHT> node initindex
✅ DB connected
✅ Indexes created


You only need to add .index() in model files — that's permanent.
No need to call .createIndexes() every time app starts.
🚀 After indexing, your search APIs (?search, ?from=XXX&to=YYY) will be significantly faster, even with big data.


*/

