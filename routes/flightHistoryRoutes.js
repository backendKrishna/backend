const express = require("express");
const router = express.Router();
const controller = require("../controllers/flightHistoryController");

router.get("/", controller.getFlightHistory);
router.post("/", controller.addFlightHistory);

module.exports = router;
