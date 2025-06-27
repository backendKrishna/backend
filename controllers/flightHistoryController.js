const FlightHistory = require("../models/FlightHistory");
const Flight = require("../models/Flight");

exports.getFlightHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    const totalCount = await FlightHistory.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const history = await FlightHistory.find()
      .populate("flightId")
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      status: "success",
      message: "Flight history fetched successfully",
      currentPage: page,
      perPage: perPage,
      totalPages: totalPages,
      totalCount: totalCount,
      data: history,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.addFlightHistory = async (req, res) => {
  try {
    const { flightId, price, userEmail } = req.body;

    if (!flightId || !price || !userEmail) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields: flightId, price, or userEmail",
      });
    }

    const newEntry = new FlightHistory({
      flightId,
      price,
      userEmail,
      date: new Date(), // ⏱️ Optional: can also use default Date.now in schema
    });

    await newEntry.save();

    res.status(201).json({
      status: "success",
      message: "Flight history entry created successfully",
      data: newEntry,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Internal server error",
    });
  }
};
