// src/utils/responseHelper.js

/**
 * Standard API Response Helper
 * Provides consistent response format across the application
 */

class ApiResponse {
  /**
   * Success Response
   * @param {Object} res - Express response object
   * @param {Object} data - Response data
   * @param {String} message - Success message
   * @param {Number} statusCode - HTTP status code (default: 200)
   */
  static success(res, data = null, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Error Response
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   * @param {Number} statusCode - HTTP status code (default: 400)
   * @param {Object} errors - Validation errors or additional error details
   */
  static error(
    res,
    message = "An error occurred",
    statusCode = 400,
    errors = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Paginated Response
   * @param {Object} res - Express response object
   * @param {Array} data - Array of data items
   * @param {Number} page - Current page number
   * @param {Number} limit - Items per page
   * @param {Number} total - Total number of items
   * @param {String} message - Success message
   */
  static paginated(res, data, page, limit, total, message = "Success") {
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      message,
      data,
      pagination: {
        currentPage: parseInt(page),
        perPage: parseInt(limit),
        totalItems: parseInt(total),
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Created Response (201)
   * @param {Object} res - Express response object
   * @param {Object} data - Created resource data
   * @param {String} message - Success message
   */
  static created(res, data, message = "Resource created successfully") {
    return res.status(201).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * No Content Response (204)
   * @param {Object} res - Express response object
   */
  static noContent(res) {
    return res.status(204).send();
  }

  /**
   * Validation Error Response (422)
   * @param {Object} res - Express response object
   * @param {Object} errors - Validation errors
   */
  static validationError(res, errors) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Unauthorized Response (401)
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   */
  static unauthorized(res, message = "Unauthorized access") {
    return res.status(401).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Forbidden Response (403)
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   */
  static forbidden(res, message = "Access forbidden") {
    return res.status(403).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Not Found Response (404)
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   */
  static notFound(res, message = "Resource not found") {
    return res.status(404).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Server Error Response (500)
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   */
  static serverError(res, message = "Internal server error") {
    return res.status(500).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Custom Response
   * @param {Object} res - Express response object
   * @param {Number} statusCode - HTTP status code
   * @param {Boolean} success - Success flag
   * @param {String} message - Response message
   * @param {Object} data - Response data
   * @param {Object} meta - Additional metadata
   */
  static custom(res, statusCode, success, message, data = null, meta = null) {
    const response = {
      success,
      message,
      timestamp: new Date().toISOString(),
    };

    if (data !== null) {
      response.data = data;
    }

    if (meta !== null) {
      response.meta = meta;
    }

    return res.status(statusCode).json(response);
  }
}

module.exports = ApiResponse;

// ============================================
// USAGE EXAMPLES
// ============================================

/**
 * Example 1: Success Response
 *
 * const ApiResponse = require('../utils/responseHelper');
 *
 * router.get('/customers/:id', async (req, res) => {
 *   const customer = await Customer.findById(req.params.id);
 *   return ApiResponse.success(res, customer, 'Customer retrieved successfully');
 * });
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "Customer retrieved successfully",
 *   "data": { customer object },
 *   "timestamp": "2025-01-15T10:30:00.000Z"
 * }
 */

/**
 * Example 2: Created Response
 *
 * router.post('/loans', async (req, res) => {
 *   const newLoan = await Loan.create(req.body);
 *   return ApiResponse.created(res, newLoan, 'Loan created successfully');
 * });
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "Loan created successfully",
 *   "data": { loan object },
 *   "timestamp": "2025-01-15T10:30:00.000Z"
 * }
 */

/**
 * Example 3: Validation Error
 *
 * router.post('/customers', async (req, res) => {
 *   const errors = validationResult(req);
 *   if (!errors.isEmpty()) {
 *     return ApiResponse.validationError(res, errors.array());
 *   }
 * });
 *
 * Response:
 * {
 *   "success": false,
 *   "message": "Validation failed",
 *   "errors": [
 *     { "field": "email", "message": "Invalid email format" },
 *     { "field": "phone", "message": "Phone number is required" }
 *   ],
 *   "timestamp": "2025-01-15T10:30:00.000Z"
 * }
 */

/**
 * Example 4: Paginated Response
 *
 * router.get('/loans', async (req, res) => {
 *   const { page = 1, limit = 10 } = req.query;
 *   const { loans, total } = await Loan.findAllPaginated(page, limit);
 *   return ApiResponse.paginated(res, loans, page, limit, total, 'Loans retrieved successfully');
 * });
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "Loans retrieved successfully",
 *   "data": [ loan objects ],
 *   "pagination": {
 *     "currentPage": 1,
 *     "perPage": 10,
 *     "totalItems": 45,
 *     "totalPages": 5,
 *     "hasNextPage": true,
 *     "hasPrevPage": false
 *   },
 *   "timestamp": "2025-01-15T10:30:00.000Z"
 * }
 */

/**
 * Example 5: Error Response
 *
 * router.get('/customers/:id', async (req, res) => {
 *   try {
 *     const customer = await Customer.findById(req.params.id);
 *     if (!customer) {
 *       return ApiResponse.notFound(res, 'Customer not found');
 *     }
 *     return ApiResponse.success(res, customer);
 *   } catch (error) {
 *     return ApiResponse.serverError(res, error.message);
 *   }
 * });
 *
 * Response (404):
 * {
 *   "success": false,
 *   "message": "Customer not found",
 *   "timestamp": "2025-01-15T10:30:00.000Z"
 * }
 */

/**
 * Example 6: Unauthorized Response
 *
 * router.get('/admin/dashboard', authMiddleware, (req, res) => {
 *   if (!req.user.isAdmin) {
 *     return ApiResponse.forbidden(res, 'Admin access required');
 *   }
 *   // ... rest of the code
 * });
 *
 * Response:
 * {
 *   "success": false,
 *   "message": "Admin access required",
 *   "timestamp": "2025-01-15T10:30:00.000Z"
 * }
 */

/**
 * Example 7: Custom Response with Meta
 *
 * router.get('/reports/summary', async (req, res) => {
 *   const summary = await Report.getSummary();
 *   return ApiResponse.custom(
 *     res,
 *     200,
 *     true,
 *     'Report generated successfully',
 *     summary,
 *     { generatedAt: new Date(), reportType: 'monthly' }
 *   );
 * });
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "Report generated successfully",
 *   "data": { summary data },
 *   "meta": {
 *     "generatedAt": "2025-01-15T10:30:00.000Z",
 *     "reportType": "monthly"
 *   },
 *   "timestamp": "2025-01-15T10:30:00.000Z"
 * }
 */
