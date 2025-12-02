const config = require("../config/config");

const logLevels = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

const currentLogLevel = process.env.LOG_LEVEL || (config.nodeEnv === "production" ? "INFO" : "DEBUG");

const shouldLog = (level) => {
  return logLevels[level] <= logLevels[currentLogLevel];
};

const formatMessage = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...meta,
  };

  return JSON.stringify(logEntry);
};

const logger = {
  error: (message, meta) => {
    if (shouldLog("ERROR")) {
      console.error(formatMessage("ERROR", message, meta));
    }
  },
  warn: (message, meta) => {
    if (shouldLog("WARN")) {
      console.warn(formatMessage("WARN", message, meta));
    }
  },
  info: (message, meta) => {
    if (shouldLog("INFO")) {
      console.info(formatMessage("INFO", message, meta));
    }
  },
  debug: (message, meta) => {
    if (shouldLog("DEBUG")) {
      console.debug(formatMessage("DEBUG", message, meta));
    }
  },
};

module.exports = logger;


