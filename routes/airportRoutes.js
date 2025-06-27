const express = require("express");
const router = express.Router();
const { getAirports, createAirport } = require("../controllers/airportController");

router.get("/", getAirports);        // e.g., /api/airports?search=del
router.post("/", createAirport);     // for inserting new airports

module.exports = router;
