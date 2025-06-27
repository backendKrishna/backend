const Deal = require("../models/Deals");

// ✅ Create a new deal
exports.createDeal = async (req, res) => {
  try {
    const { city, price, image } = req.body;

    if (!city || !price || !image) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    const newDeal = new Deal({ city, price, image });
    await newDeal.save();

    res.status(201).json({
      status: "success",
      message: "Deal created successfully",
      data: newDeal,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error", error: err.message });
  }
};

// ✅ Get all deals with pagination
exports.getAllDeals = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 15;
    const skip = (page - 1) * perPage;

    const totalCount = await Deal.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const deals = await Deal.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: "success",
      message: "Deals fetched successfully",
      currentPage: page,
      perPage,
      totalPages,
      totalCount,
      data: deals,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Failed to fetch deals", error: err.message });
  }
};
