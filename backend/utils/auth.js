const Joi = require('joi');

// Registration validation
function validateRegistration(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(user);
}

// Login validation
function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(user);
}

module.exports = { validateRegistration, validateLogin };
