const router = require('express').Router();
const { userController } = require('../controller');

router.post('/', userController.login);

module.exports = router;
