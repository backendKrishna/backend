const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
require('dotenv').config(); // Load environment variables

const flightRoutes = require("./routes/flightRoutes");
const alertRoutes = require("./routes/alertRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const airportRoutes = require("./routes/airportRoutes");
const flightHistoryRoutes = require("./routes/flightHistoryRoutes");
const userRoutes = require("./routes/userRoutes");
const dealsRoutes =  require("./routes/dealsRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// ✅ Enable CORS for all routes
app.use(cors());
app.use(express.json());

// ✅ Use compression middleware // Compression reduces the size of your API responses before sending them to the client.
app.use(compression());


// mongoose.connect("mongodb://localhost:27017/googleflight")
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log('db connected')})
.catch((err)=>{console.log(err)})


app.use("/api/users", userRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/airports", airportRoutes);
app.use("/api/flighthistory", flightHistoryRoutes);
app.use("/api/deals", dealsRoutes);
app.use("/api/subscriber", subscribeRoutes);
app.use("/api/quotes", quoteRoutes);


app.use("/api/contact", contactRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));




/*
✅ Test It in Postman:
POST http://localhost:5000/api/visitors

Body:


{
  "name": "Krishna Shukla",
  "email": "krishna.user@example.com",
  "from": "DEL",
  "to": "BOM",
  "travelDate": "2025-06-21"
}


{
    "message": "Details emailed successfully (Mailtrap)"
}


Then go to https://mailtrap.io > Inbox → You'll see the email content 🎉


==========================
MAILTRAP DATA REACED OUT SO I COMMENTED SOME LINE IN 'visitorController.js' FILE AND NO ANY CHANGED ANY FILE,FRONTEND ALSOP NO ANY CHANGE REQUIRED


*/


