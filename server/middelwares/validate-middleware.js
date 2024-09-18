const validate = (schema) => async (req, res, next) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next(); 
    } catch (err) {
      const status = 422;
      // Extract error messages and select the first one
      const errorMessage = err.errors[0].message;
  
      const errorResponse = {
        status,
        message: "Validation failed",
        extraDetails: errorMessage,  // Only one error message
      };
  
      return res.status(status).json(errorResponse); // Send response with a single validation error
    }
  };
  
  module.exports = validate;
  