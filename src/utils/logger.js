import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

// Helper to get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`
  )
);

// Create the Winston logger instance
    const logger = winston.createLogger({
  level: "info", // Default log level
  format: logFormat,
  transports: [
    // 1. Console Transport (for development/immediate visibility)
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(), // Add colors for console readability
        logFormat
      ),
    }),

    // 2. File Transport (for persistent storage)
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs", "error.log"),
      level: "error", // Only log errors to this file
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs", "app.log"),
      level: "info",
    }),
  ],
});

export default logger;
