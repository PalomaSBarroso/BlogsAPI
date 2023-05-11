const { httpStatusCode, customerResponse } = require('../utils');
const { categoryServices } = require('../services');

const { correctReturn } = httpStatusCode;

const createCategory = async (req, res) => {
  const { type, message } = await categoryServices.createCategory(req.body);
  return customerResponse(type, message, res, correctReturn.CREATED);
};

const getAll = async (_req, res) => {
  const { type, message } = await categoryServices.getAll();
  return customerResponse(type, message, res, correctReturn.OK);
};

module.exports = {
  createCategory,
  getAll,
};