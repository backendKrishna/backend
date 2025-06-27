const express = require("express");
const router = express.Router();
const { searchFlights, insertFlights,updateFlight,deleteFlight } = require("../controllers/flightController");

router.get("/", searchFlights);
router.post("/", insertFlights);
router.put("/:id", updateFlight);
router.delete("/:id", deleteFlight);


module.exports = router;