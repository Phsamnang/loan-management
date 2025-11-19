const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/responseHelper");
const { pool } = require("../config/database");
const { User } = require("../models");

/**
 * Verify JWT Token
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return ApiResponse.unauthorized(res, "Access token is required");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return ApiResponse.unauthorized(res, "User not found");
    }
    if (user.status !== "active") {
      return ApiResponse.forbidden(res, "User account is inactive");
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return ApiResponse.unauthorized(res, "Invalid token");
    }
    if (error.name === "TokenExpiredError") {
      return ApiResponse.unauthorized(res, "Token expired");
    }
    return ApiResponse.serverError(res, error.message);
  }
};

module.exports = { authenticate };
