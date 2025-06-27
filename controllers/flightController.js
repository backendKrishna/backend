const Flight = require("../models/Flight");
const FlightHistory = require("../models/FlightHistory");
const Airport = require("../models/airport");


exports.searchFlights = async (req, res) => {
  try {
    const {
      from,
      to,
      date,
      sort = "best",
      cabinClass,
      stops,
      page = 1,
      perPage = 10,
    } = req.query;

    const skip = (page - 1) * perPage;
    const limit = parseInt(perPage);

    let query = {};

    // 🔍 Airport lookup logic
    let fromCodes = [];
    let toCodes = [];

    if (from) {
      const fromAirports = await Airport.find({
        $or: [
          { code: new RegExp(from, "i") },
          { city: new RegExp(from, "i") },
          { name: new RegExp(from, "i") },
        ],
      });
      fromCodes = fromAirports.map((a) => a.code.toUpperCase());
    }

    if (to) {
      const toAirports = await Airport.find({
        $or: [
          { code: new RegExp(to, "i") },
          { city: new RegExp(to, "i") },
          { name: new RegExp(to, "i") },
        ],
      });
      toCodes = toAirports.map((a) => a.code.toUpperCase());
    }

    // Apply from/to filters using $in
    if (fromCodes.length > 0) query.from = { $in: fromCodes };
    if (toCodes.length > 0) query.to = { $in: toCodes };
    if (cabinClass) query.cabinClass = cabinClass;
    if (stops) query.stops = Number(stops);

    const totalCount = await Flight.countDocuments(query);

    let flights = await Flight.find(query).skip(skip).limit(limit);

    flights = flights.map((f) => {
      const discountedPrice = f.basePrice * (1 - f.discountPercent / 100);
      return { ...f.toObject(), discountedPrice };
    });

    if (sort === "cheapest") {
      flights.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else {
      flights.sort(
        (a, b) =>
          a.discountedPrice * (1 + (a.delayProbability || 0)) -
          b.discountedPrice * (1 + (b.delayProbability || 0))
      );
    }

    const totalPages = Math.ceil(totalCount / perPage);

    res.status(200).json({
      status: "success",
      message: "Flights fetched successfully",
      currentPage: parseInt(page),
      perPage: parseInt(perPage),
      totalPages,
      totalCount,
      data: flights,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.insertFlights = async (req, res) => {
  try {
    const flights = req.body;

    if (!Array.isArray(flights) || flights.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Please provide an array of flight data.",
      });
    }

    const result = await Flight.insertMany(flights);

    res.status(201).json({
      status: "success",
      message: `${result.length} flight(s) inserted successfully`,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Internal server error",
    });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFlight = await Flight.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFlight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    res.json(updatedFlight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Flight.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Flight not found" });
    }

    res.json({ message: "✈️ Flight deleted successfully", flight: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


