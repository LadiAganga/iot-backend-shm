const express = require("express");
const router = express.Router();
const supabase = require("../config/database");

router.get("/", async (req, res) => {
  try {
    // Check database connection
    const { error } = await supabase.from("sensor_data").select("id").limit(1);

    res.status(200).json({
      success: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: error ? "disconnected" : "connected",
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
    });
  }
});

module.exports = router;


