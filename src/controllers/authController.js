import { User } from "../models/index.js";
import logger from "../utils/logger.js";
import { ApiResponse } from "../utils/responseHelper.js";
import jwt from "jsonwebtoken";

class AuthController {
  // Login
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Find user
      const user = await User.findOne({ where: { username } });

      if (!user) {
        logger.warn(`Login failed for username: ${username} - User not found`);
        return ApiResponse.unauthorized(res, "Invalid username or password");
      }

      // Check if user is active
      if (user.status !== "active") {
        return ApiResponse.forbidden(res, "Account is inactive");
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return ApiResponse.unauthorized(res, "Invalid username or password");
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.user_id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || "7d" }
      );

      logger.info(`User logged in: ${username}`);

      return ApiResponse.success(
        res,
        {
          token,
          user: user.toJSON(),
        },
        "Login successful"
      );
    } catch (error) {
      return ApiResponse.serverError(res, error.message);
    }
  }

  // Register new user
  async register(req, res) {
    try {
      const { username, email, password, full_name, role } = req.body;

      const user = await User.create({
        username,
        password_hash: password, // Will be hashed by beforeCreate hook
        full_name,
        role,
      });
         logger.info(
           `New user registered. User ID: ${user.user_id}, Username: ${user.username}`
         );
      return ApiResponse.created(
        res,
        user.toJSON(),
        "User registered successfully"
      );
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return ApiResponse.error(res, "Username or email already exists", 409);
      }
      logger.error(`Registration failed: ${error.message}`, {
        fields: Object.keys(error.fields || {}),
        stack: error.stack,
      });
      return ApiResponse.serverError(res, error.message);
    }
  }
}

export default new AuthController();
