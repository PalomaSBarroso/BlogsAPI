const { httpStatusCode, customerResponse } = require('../utils');
const { userService } = require('../services');

const { correctReturn } = httpStatusCode;

const login = async (req, res) => {
  const { type, message } = await userService.login(req.body);
  customerResponse(type, message, res, correctReturn.OK);
};

const createUser = async (req, res) => {
  const { type, message } = await userService.createUser(req.body);
  customerResponse(type, message, res, correctReturn.CREATED);
};

const getAll = async (_req, res) => {
  const { type, message } = await userService.getAll();
  return customerResponse(type, message, res, correctReturn.OK);
};

const getById = async (req, res) => {
  const { type, message } = await userService.getById(req.params.id);
  return customerResponse(type, message, res, correctReturn.OK);
};

const deleteUser = async (req, res) => {
  const { type, message } = await userService.deleteUser(req.user.id);
  return customerResponse(type, message, res, httpStatusCode.NO_CONTENT);
};

module.exports = {
  login,
  createUser,
  getAll,
  getById,
  deleteUser,
};