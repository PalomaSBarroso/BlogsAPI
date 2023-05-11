const { errorResponse } = require('../utils/httpStatusCode');
const { tokenVerification } = require('../authentication/createToken');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(errorResponse.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  const { error, data } = tokenVerification(token);
  if (error) {
    return res.status(errorResponse.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
  req.user = data;
  return next();
};