const express = require("express");
const router = express.Router();
const { sendVisitorDetails,getAllVisitors } = require("../controllers/visitorController");

router.post("/", sendVisitorDetails);
router.get("/", getAllVisitors);


module.exports = router;
