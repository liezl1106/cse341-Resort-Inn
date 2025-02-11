const Joi = require('joi');

const joiValidation = (schema) => {
  return async (req, res, next) => {
    try {
      console.log('Validating request:');
      console.log('Params:', req.params);
      console.log('Body:', req.body);
      console.log('Query:', req.query);
      
      const value = await schema.validateAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      
      console.log('Validation successful:', value);
      next();
    } catch (error) {
      console.log('Validation error:', error.message);
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };
};

module.exports = { joiValidation };
;
