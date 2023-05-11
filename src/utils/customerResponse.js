const { errorMapper } = require('./httpStatusCode');

module.exports = (type, message, res, statusCode) => {
    if (type) return res.status(errorMapper(type)).json({ message });

  if (statusCode === 204) return res.status(statusCode).end();

  return res.status(statusCode).json(message);
};