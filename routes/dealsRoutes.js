const express = require("express");
const router = express.Router();
const { createDeal, getAllDeals } = require("../controllers/dealsController");

// ✅ POST: Create new deal
router.post("/", createDeal);

// ✅ GET: Fetch all deals with pagination
router.get("/", getAllDeals);

module.exports = router;
