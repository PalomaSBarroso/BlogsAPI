const { loginSchema, createUserSchema, 
  createCategorySchema, createPostSchema, updatePostSchema } = require('./schemas');

  const errorIsExists = (error) => {
  if (error) return { type: 'BAD_REQUEST', message: error.message };

  return { type: null, message: '' };
};

const login = (email, password) => {
  const { error } = loginSchema.validate({ email, password });

  return errorIsExists(error);
};

const createUser = (newUser) => {
  const { error } = createUserSchema.validate(newUser);

  return errorIsExists(error);
};

const createCategory = (name) => {
  const { error } = createCategorySchema.validate({ name });

  if (error) return { type: 'BAD_REQUEST', message: error.message };

  return errorIsExists(error);
};

const createPost = (newBlogPost) => {
  const { error } = createPostSchema.validate(newBlogPost);

  return errorIsExists(error);
};

const updatePost = (newBlogPost) => {
  const { error } = updatePostSchema.validate(newBlogPost);

  return errorIsExists(error);
};

module.exports = {
login,
createUser,
createCategory,
createPost,
updatePost,
};