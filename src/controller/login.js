const { errorMap, httpsStatusCode } = require('../utils');
const { loginServices } = require('../services');
const { createToken } = require('../authentication/createToken');

module.exports = async (req, res) => {
  const { email, password } = req.body;
   const { type, message } = await loginServices.login(email, password);
    if (type) return res.status(errorMap.mapError(type)).json({ message });
if (!message) return res.status(errorMap.mapError(type)).json({ message });
const { password: _, ...userPassword } = message.dataValues;
const token = createToken(userPassword);
res.status(httpsStatusCode.OK).json({ token });
};
