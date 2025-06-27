const Quote = require("../models/Quote");

exports.submitQuote = async (req, res) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();
    res.status(201).json({ message: "Quote submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting quote", error: error.message });
  }
};
// GET: Retrieve all quotes
exports.getAllQuotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    const totalCount = await Quote.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const quotes = await Quote.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: "success",
      message: "Quotes fetched successfully",
      currentPage: page,
      perPage: perPage,
      totalPages: totalPages,
      totalCount: totalCount,
      data: quotes,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error fetching quotes", error: error.message });
  }
};
