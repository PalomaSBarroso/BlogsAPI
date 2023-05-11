const Joi = require('joi');

const requiredFields = 'Some required fields are missing';
const textFields = '{#label} must be the type text';
const customMessage = {
  'any.required': requiredFields,
  'string.empty': requiredFields,
  'string.base': textFields,
  'array.min': requiredFields,
};

const categoryIds = Joi.array().items(Joi.number()).min(1).required();
const content = Joi.string().min(1).required();
const displayName = Joi.string().min(8).required();
const email = Joi.string().email().min(1).required();
const image = Joi.string();
const name = Joi.string().min(5).required();
const password = Joi.string().min(6).required();
const title = Joi.string().min(1).required();

const loginSchema = Joi.object({
  email,
  password,
}).required().messages(customMessage);

const createUserSchema = Joi.object({
  displayName,
  email,
  password,
  image,
}).required();

const createCategorySchema = Joi.object({
  name,
}).required();

const createPostSchema = Joi.object({
  title,
  content,
  categoryIds,
}).required().messages(customMessage);

const updatePostSchema = Joi.object({
  title,
  content,
}).required().messages(customMessage);

module.exports = {
  loginSchema,
  createUserSchema,
  createCategorySchema,
  createPostSchema,
  updatePostSchema,
};