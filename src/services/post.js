const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');
const validationInputValues = require('./validations/validationInputValues');
const validateCategoryExists = require('./validations/validationCategoryExists');

const { SERVICE_SUCESSFULL, UNSUCCESSFUL_SERVICE,
  POST_DOES_NOT_EXISTS, UNAUTHORIZED } = require('./helpers');

const createPost = async ({ title, content, categoryIds }, userId) => {
  try {
    const { type, message } = validationInputValues.createPost({ title, content, categoryIds });
    if (type) return { type, message };

    const categoryIsExists = await validateCategoryExists(categoryIds);
    if (categoryIsExists.type) return categoryIsExists;

    const postCreated = await BlogPost.create({ title, content, userId });

    await postCreated.addCategory(categoryIds);

    return { ...SERVICE_SUCESSFULL, message: postCreated };
} catch (error) {
  console.error(error.message);
  return UNSUCCESSFUL_SERVICE;
  }
};

const getAllUserPosts = async () => {
  try {
    const data = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories' },
      ],
    });
  
    return { ...SERVICE_SUCESSFULL, message: data };
  } catch (error) {
    console.error(error.message);

    return UNSUCCESSFUL_SERVICE;
  }
};

const getPostById = async (id) => {
  try {
    const post = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!post) return POST_DOES_NOT_EXISTS;

    return { ...SERVICE_SUCESSFULL, message: post };
  } catch (error) {
    console.error(error.message);

    return UNSUCCESSFUL_SERVICE;
  }
};

const updatePost = async ({ title, content }, id, userId) => {
  try {
    const { type, message } = validationInputValues.updatePost({ title, content });
    if (type) return { type, message };

    const [updatedPost] = await BlogPost.update(
      { title, content },
      { where: { id, userId } },
    );

    if (!updatedPost) return UNAUTHORIZED;

    const result = await getPostById(id);

    return { ...SERVICE_SUCESSFULL, message: result.message };
  } catch (error) {
    console.error(error.message);

    return UNSUCCESSFUL_SERVICE;
  }
};

const deletePost = async (id, userId) => {
  try {
    const postIsExists = await BlogPost.findByPk(id);

    if (!postIsExists) return POST_DOES_NOT_EXISTS;

    const deletedPost = await BlogPost.destroy(
      { where: { id, userId } },
    );

    if (!deletedPost) return UNAUTHORIZED;

    return SERVICE_SUCESSFULL;
  } catch (error) {
    console.error(error.message);

    return UNSUCCESSFUL_SERVICE;
  }
};

const fetchPost = async (query) => {
  try {
    const foundPost = await BlogPost.findAll({
      where: {
        [Op.or]: {
          title: { [Op.like]: `%${query}%` },
          content: { [Op.like]: `%${query}%` },
        },
      },

      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return { ...SERVICE_SUCESSFULL, message: foundPost };
  } catch (error) {
    console.error(error.message);

    return UNSUCCESSFUL_SERVICE;
  }
};

module.exports = {
  createPost,
  getAllUserPosts,
  getPostById,
  updatePost,
  deletePost,
  fetchPost,
};