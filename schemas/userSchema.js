const Joi = require("joi");

const createSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(155).required(),
  first_name: Joi.string().alphanum().min(2).max(155).required(),
  last_name: Joi.string().alphanum().min(2).max(155).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("admin", "user").required(),
  state: Joi.string().valid("male", "female").required(),
});

const updateSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(155),
  first_name: Joi.string().alphanum().min(2).max(155),
  last_name: Joi.string().alphanum().min(2).max(155),
  email: Joi.string().email(),
  role: Joi.string().valid("admin", "user"),
  state: Joi.string().valid("male", "female"),
});

module.exports = { createSchema, updateSchema };
