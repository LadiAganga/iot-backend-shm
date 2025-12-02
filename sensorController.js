const sensorService = require("../services/sensorService");
const logger = require("../utils/logger");

const uploadSensorData = async (req, res, next) => {
    try {
        // --- 1. Extract data from the request body ---
        // You MUST extract the data BEFORE you use it. It's in req.body.
        const { strain } = req.body; 
        
        // --- 2. Call the service layer to handle the database operation ---
        // The service layer (sensorService) already handles the Supabase import and insertion.
        const insertedData = await sensorService.createSensorData({ strain }); 

        // --- 3. Send the 200 success response ---
        logger.info("Data successfully inserted", { strain: strain });
        res.status(200).json({ 
            success: true, 
            message: "Data uploaded successfully to Supabase", 
            inserted_data: insertedData 
        });

    } catch (e) {
        // If the service layer throws an error (including Supabase errors), catch it here
        logger.error("Server Error during upload:", e);
        // Use next(e) to pass it to your global error handler (app.use(errorHandler))
        next(e); 
    }
};

const getSensorData = async (req, res, next) => {
    try {
        const { limit = 100, offset = 0 } = req.query;
        const result = await sensorService.getSensorData(parseInt(limit), parseInt(offset));

        res.status(200).json({
            success: true,
            data: result.data,
            count: result.count,
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadSensorData,
    getSensorData,
};

