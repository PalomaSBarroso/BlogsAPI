const { httpStatusCode, customerResponse } = require('../utils');
const { postServices } = require('../services');

const { correctReturn } = httpStatusCode;

const createPost = async (req, res) => {
  const { type, message } = await postServices.createPost(req.body, req.user.id);
  return customerResponse(type, message, res, correctReturn.CREATED);
}; 

const getAllUserPosts = async (_req, res) => {
  const { type, message } = await postServices.getAllUserPosts();
  return customerResponse(type, message, res, correctReturn.OK);
  };

  const getPostById = async (req, res) => {
    const { type, message } = await postServices.getPostById(req.params.id);
    return customerResponse(type, message, res, correctReturn.OK);
  };
  
  const updatePost = async (req, res) => {
    const { type, message } = await postServices.updatePost(req.body, req.params.id, req.user.id);
    return customerResponse(type, message, res, correctReturn.OK);
  };

  const deletePost = async (req, res) => {
    const { type, message } = await postServices.deletePost(req.params.id, req.user.id);
    return customerResponse(type, message, res, correctReturn.NO_CONTENT);
  };

  const fetchPost = async (req, res) => {
    const { type, message } = await postServices.fetchPost(req.query.q);
    return customerResponse(type, message, res, correctReturn.OK);
  };

module.exports = {
  createPost,
  getAllUserPosts,
  getPostById,
  updatePost,
  deletePost,
  fetchPost,
};