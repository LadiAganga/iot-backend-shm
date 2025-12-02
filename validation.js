const validateSensorData = (req, res, next) => {
  const { strain } = req.body;

  const errors = [];

  // Validate required fields
  
  if (strain === undefined || strain === null) {
    errors.push("strain is required");
  }

  // Validate data types and ranges
  
  if (strain !== undefined && (typeof strain !== "number" || isNaN(strain))) {
    errors.push("strain must be a valid number");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation failed",
        details: errors,
      },
    });
  }

  next();
};

module.exports = {
  validateSensorData,
};


