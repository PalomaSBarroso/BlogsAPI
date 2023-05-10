const { User } = require('../models');
const validation = require('./validations/validationInputValues');

const createUser = async (newUser) => {
  try {
    const { type, message } = validation.createUser(newUser);
    if (type) return { type, message };

    const userCreated = await User.create({ ...newUser });

    return { type: null, message: userCreated };
  } catch (error) {
    console.error(error.message);

    return { type: 'CONFLICT', message: 'User already registered' };
  }
};

const getAll = async () => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: 'password',
      },
    });

    return { type: null, message: users };
  } catch (error) {
    console.error(error.message);

    return { type: 'SERVER_ERROR', message: 'Unexpected error' };
  }
};

module.exports = {
  createUser,
  getAll,
};