/*

require("dotenv").config();
const nodemailer = require("nodemailer");

exports.sendVisitorDetails = async (req, res) => {
  const { name, email, phone, from, to, travelDate } = req.body;

    if (!name || !email || !phone || !from || !to || !travelDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Visitor received:", req.body); // ✅ debug log


  try {

/*  //IF USE MAILTRAP THEN UNCOMMENT BELOW CODE



    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      from: '"Flight Booking App" <no-reply@flightapp.com>',
      to: "krishna@yourcompany.com", // Replace with your own test receiver (you'll view it in Mailtrap)
      subject: "New Visitor Travel Info",
      html: `
        <h3>User visited the page</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
         <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>From:</strong> ${from}</p>
        <p><strong>To:</strong> ${to}</p>
        <p><strong>Date:</strong> ${travelDate}</p>
      `
    };
console.log("📩 Received visitor data:", req.body);

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Details emailed successfully (Mailtrap)" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

*/


/*
   res.status(200).json({ message: "Mail temporarily disabled, but request received." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


*/

//------------------------------[1] is correct-----------------------------------
/*



//RESEND MAILER

require("dotenv").config();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendVisitorDetails = async (req, res) => {
  const { name, email, phone, from, to, travelDate,returnDate,tripType } = req.body;

    console.log("🛬 Incoming request:", req.body);

  if (!name || !email || !phone || !from || !to || !travelDate ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

// Only check returnDate for roundtrip
  if (tripType === "roundtrip" && (!returnDate || returnDate.trim() === "")) {
    return res.status(400).json({ error: "Return date is required for roundtrip" });
  }
  
  console.log("Visitor received:", req.body); // ✅ debug log

  try {


    // const result = await resend.emails.send({
    //   from: 'onboarding@resend.dev', // default verified sender in sandbox
    //   to: 'krishnaprasad24795@gmail.com', // your receiver email
    //   subject: '🚀 New Visitor Travel Info',
    //   html: `
    //     <h3>🧍 Visitor Travel Submission</h3>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>From:</strong> ${from}</p>
    //     <p><strong>To:</strong> ${to}</p>
    //     <p><strong>Travel Date:</strong> ${travelDate}</p>
    //     <p><strong>Return Date:</strong> ${returnDate}</p>

    //   `
    // });
    
    // res.status(200).json({ message: "✅ Visitor email sent successfully!", result });



       res.status(200).json({
      message: "📥 Visitor details received (email sending disabled for now)",
      data: { name, email, phone, from, to, travelDate,returnDate,tripType  }
    });


  } catch (err) {
    console.error("❌ Email send failed:", err);
    res.status(500).json({ error: "Failed to send visitor email", details: err });
  }
};



*/


//-----------------------------------------------------
/*

// RESEND MAILER

require("dotenv").config();
const { Resend } = require("resend");
const Visitor = require("../models/Visitor"); // ✅ Add Visitor model

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ 1. Save Visitor Details
exports.sendVisitorDetails = async (req, res) => {
  const { name, email, phone, from, to, travelDate, returnDate, tripType } = req.body;

  console.log("🛬 Incoming request:", req.body);

  // ❌ Basic validation
  if (!name || !email || !phone || !from || !to || !travelDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // ✅ Roundtrip return date check
  if (tripType === "roundtrip" && (!returnDate || returnDate.trim() === "")) {
    return res.status(400).json({ error: "Return date is required for roundtrip" });
  }

  console.log("Visitor received:", req.body); // ✅ debug log

  try {
    // ✅ Save visitor to MongoDB
    const visitor = new Visitor({
      name,
      email,
      phone,
      from,
      to,
      travelDate,
      returnDate,
      tripType,
    });

    await visitor.save(); // ✅ Save to DB






//---------------------------------------------------------------------------------



    // 📨 Email sending (optional - currently disabled)

  
  const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'krishnaprasad24795@gmail.com',
      subject: '🚀 New Visitor Travel Info',
      html: `
        <h3>🧍 Visitor Travel Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>From:</strong> ${from}</p>
        <p><strong>To:</strong> ${to}</p>
        <p><strong>Travel Date:</strong> ${travelDate}</p>
        <p><strong>Return Date:</strong> ${returnDate}</p>
      `
    });

    // res.status(200).json({ message: "✅ Visitor email sent successfully!", result });
     return res.status(200).json({ message: "Email sent successfully" }); // ✅ return after response
  
     

//---------------------------------------------------------------------------------









    // ✅ Final response
    res.status(200).json({
      status: "success",
      message: "📥 Visitor details received and saved",
      data: visitor,
    });

  } catch (err) {
    console.error("❌ Email send failed:", err);
    //  res.status(500).json({

    return res.status(500).json({
      status: "error",
      message: "Failed to process visitor details",
      error: err.message,
    });
  }
};

// ✅ 2. Get All Visitors (with Pagination)
exports.getAllVisitors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    const totalCount = await Visitor.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const visitors = await Visitor.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: "success",
      message: "Visitors fetched successfully",
      currentPage: page,
      perPage,
      totalPages,
      totalCount,
      data: visitors,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch visitors",
      error: err.message,
    });
  }
};

*/
// =================================================

// controllers/visitorController.js
require("dotenv").config();
const { Resend } = require("resend");
const Visitor = require("../models/Visitor");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendVisitorDetails = async (req, res) => {
  const {
    name,
    email,
    phone,
    from,
    to,
    travelDate,
    returnDate,
    tripType,
    seatClass,
    travelers = {}, // contains: adults, children, lapInfants
  } = req.body;

  console.log("🛬 Incoming Visitor:", req.body);

  // ✅ Basic validation
  if (!name || !email || !phone || !from || !to || !travelDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (tripType === "roundtrip" && (!returnDate || returnDate.trim() === "")) {
    return res.status(400).json({ error: "Return date is required for roundtrip" });
  }

  try {
    const totalTravelers =
      (travelers.adults || 0) + (travelers.children || 0) + (travelers.lapInfants || 0);

    // ✅ Save visitor
    const visitor = new Visitor({
      name,
      email,
      phone,
      from,
      to,
      travelDate,
      returnDate,
      tripType,
      seatClass,
      travelers,
    });
    await visitor.save();

    //-------------------------------------------------------------------------------------




    // ✅ Build HTML Email
    const html = `
        <h2>👤 New Visitor Travel Info</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Trip Type:</strong> ${tripType}</p>
        <p><strong>From:</strong> ${from}</p>
        <p><strong>To:</strong> ${to}</p>
        <p><strong>Travel Date:</strong> ${travelDate}</p>
        <p><strong>Return Date:</strong> ${returnDate || "N/A"}</p>
        <p><strong>Class:</strong> ${seatClass || "N/A"}</p>
  
        <h3>👥 Travelers</h3>
        <ul>
          <li><strong>Total:</strong> ${totalTravelers}</li>
          <li><strong>👨 Adults:</strong> ${travelers.adults || 0}</li>
          <li><strong>🧒 Children:</strong> ${travelers.children || 0}</li>
          <li><strong>👶 Lap Infants:</strong> ${travelers.lapInfants || 0}</li>
        </ul>
      `;

    // ✅ Send email
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: 'backend.9developer@gmail.com',
      subject: "🚀 New Visitor Travel Info",
      html,
    });


    // const response = await resend.emails.send({
    //   from: "support@budgetcruisedeals.com", // ✅ Use your verified domain
    //   to: 'support@budgetcruisedeals.com',   // ✅ Now this will work    to: 'yourgmail@gmail.com', // test email
    //   subject: "🚀 New Visitor Travel Info",
    //   html,
    // });

    // In .env file
    // SUPPORT_EMAIL=support@budgetcruisedeals.com

    // In code:
    // to: process.env.SUPPORT_EMAIL,



    return res.status(200).json({
      status: "success",
      message: "Visitor saved and email sent",
      data: visitor,
      emailResult: response,
    });





    //-------------------------------------------------------------------------------------

    return res.status(200).json({ message: "Email sent successfully" }); // ✅ return after response




  } catch (err) {
    console.error("❌ Error sending email:", err);
    return res.status(500).json({
      status: "error",
      message: "Failed to process visitor",
      error: err.message,
    });
  }
};

// ✅ 2. Get All Visitors (with Pagination)
exports.getAllVisitors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    const totalCount = await Visitor.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const visitors = await Visitor.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: "success",
      message: "Visitors fetched successfully",
      currentPage: page,
      perPage,
      totalPages,
      totalCount,
      data: visitors,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch visitors",
      error: err.message,
    });
  }
};




