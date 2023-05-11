const auth = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const config = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const createToken = (user) => auth.sign({ data: user }, process.env.JWT_SECRET, config);

const tokenVerification = (token) => {
  try {
    return auth.verify(token, SECRET_KEY);
  } catch (error) {
    return { error: error.message };
  }
  };

module.exports = {
  createToken,
  tokenVerification,
};