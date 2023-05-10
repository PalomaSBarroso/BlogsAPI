const router = require('express').Router();
const { loginController } = require('../controller');

router.post('/', loginController);

module.exports = router;
