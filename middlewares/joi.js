const _joi = require('joi');

const joiValidation = (schema) => {
  return async (req, res, next) => {
    const { error, value } = _joi.validate(req.body, schema);
    if (error) {
      return next({ status: 400, message: error.message });
    }
    req.body = value;
    next();
  };
};

module.exports = { joiValidation };