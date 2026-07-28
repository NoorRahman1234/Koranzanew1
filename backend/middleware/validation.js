import { validationResult } from 'express-validator';

/**
 * Middleware to validate request results and return consistent error format
 */
export const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors for consumer
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));

    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors
    });
  };
};
