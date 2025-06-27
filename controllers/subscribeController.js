/*
// controllers/subscribeController.js
const Subscriber = require("../models/Subscriber");

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: "Already subscribed" });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    return res.status(201).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Subscription error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.getSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    const totalCount = await Subscriber.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const subscribers = await Subscriber.find({}, { email: 1, _id: 0 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: "success",
      message: "Subscribers fetched successfully",
      currentPage: page,
      perPage: perPage,
      totalPages: totalPages,
      totalCount: totalCount,
      data: subscribers,
    });
  } catch (error) {
    console.error("Fetch subscribers error:", error);
    res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
  }
};

*/

//------------------------------------------------


require("dotenv").config();
const { Resend } = require("resend");
const Subscriber = require("../models/Subscriber");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: "Already subscribed" });
    }

    // Save subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // ✉️ Send confirmation email to admin (or yourself)
    const html = `
      <h2>📥 New Subscriber</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p>This user has subscribed to your newsletter or updates.</p>
    `;

    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "backend.9developer@gmail.com",
      subject: "✅ New Subscriber",
      html,
    });

    return res.status(201).json({
      message: "Subscription successful",
      emailSent: true,
      emailResult: emailResponse,
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    const totalCount = await Subscriber.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const subscribers = await Subscriber.find({}, { email: 1, _id: 0 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: "success",
      message: "Subscribers fetched successfully",
      currentPage: page,
      perPage,
      totalPages,
      totalCount,
      data: subscribers,
    });
  } catch (error) {
    console.error("Fetch subscribers error:", error);
    res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
  }
};
