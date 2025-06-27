const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Message received successfully." });
  } catch (err) {
    console.error("Contact form error:", err.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});
// GET /api/contact?page=1&limit=5
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalMessages = await Contact.countDocuments();
    const totalPages = Math.ceil(totalMessages / limit);

    const messages = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "success",
      currentPage: page,
      totalPages,
      totalMessages,
      data: messages,
    });
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});


module.exports = router;
