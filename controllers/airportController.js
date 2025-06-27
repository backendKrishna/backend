const Airport = require("../models/airport");

exports.createAirport = async (req, res) => {
  try {
    const airport = await Airport.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Airport created successfully",
      data: airport,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

// Search Airport by city name (for dropdown)
// exports.getAirports = async (req, res) => {
//   try {
//     const search = req.query.search || "";
//     const airports = await Airport.find({
//       city: { $regex: search, $options: "i" }
//     }).limit(20);
//     res.json(airports);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


//GET /api/airports?search=del&page=1&perPage=5

exports.getAirports = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    // const filter = {
    //   city: { $regex: search, $options: "i" },
    // };

      const filter = {
      $or: [
        { city: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        // { code: { $regex: search, $options: "i" } },
         { code: { $regex: `^${search}$`, $options: "i" } }, // exact match for code
      ],
    };


    

    const totalCount = await Airport.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / perPage);

    // const airports = await Airport.find(filter).skip(skip).limit(perPage);
    const airports = await Airport.find(filter).skip(skip).limit(50);


    res.status(200).json({
      status: "success",
      message: "Airports fetched successfully",
      currentPage: page,
      perPage: perPage,
      totalPages: totalPages,
      totalCount: totalCount,
      data: airports,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
