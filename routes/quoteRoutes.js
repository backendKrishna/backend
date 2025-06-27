const express = require("express");
const router = express.Router();
const { submitQuote ,getAllQuotes} = require("../controllers/quoteController");

// POST /api/quotes
router.post("/", submitQuote);
// GET /api/quotes
router.get("/", getAllQuotes);


module.exports = router;
