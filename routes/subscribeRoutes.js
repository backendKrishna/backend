// routes/subscribeRoutes.js
const express = require("express");
const router = express.Router();
const { subscribe,getSubscribers } = require("../controllers/subscribeController");

router.post("/", subscribe);
router.get("/", getSubscribers); 

module.exports = router;
