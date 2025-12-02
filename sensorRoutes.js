const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensorController");
// Assuming this is your validation middleware:
const { validateSensorData } = require("../middleware/validation"); 

// This route uses the validation middleware first, then calls the controller function.
// The controller function will handle receiving, logging, storing, and responding (200/500).
router.post("/upload", validateSensorData, sensorController.uploadSensorData);

router.get("/data", sensorController.getSensorData);

module.exports = router;

