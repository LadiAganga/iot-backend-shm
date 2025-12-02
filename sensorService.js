const supabase = require("../config/database");
const logger = require("../utils/logger");

const createSensorData = async (sensorData) => {
  try {
    const { data, error } = await supabase
      .from("sensor_data")
      .insert([sensorData])
      .select()
      .single();

    if (error) {
      logger.error("Database error creating sensor data:", error);
      const dbError = new Error(error.message);
      dbError.statusCode = 400;
      dbError.code = error.code;
      throw dbError;
    }

    return data;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    logger.error("Unexpected error creating sensor data:", error);
    throw new Error("Failed to store sensor data");
  }
};

const getSensorData = async (limit = 100, offset = 0) => {
  try {
    const { data, error, count } = await supabase
      .from("sensor_data")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error("Database error fetching sensor data:", error);
      const dbError = new Error(error.message);
      dbError.statusCode = 400;
      throw dbError;
    }

    return {
      data: data || [],
      count: count || 0,
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    logger.error("Unexpected error fetching sensor data:", error);
    throw new Error("Failed to fetch sensor data");
  }
};

module.exports = {
  createSensorData,
  getSensorData,
};


