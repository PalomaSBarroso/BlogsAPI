const router = require('express').Router();
const { userController } = require('../controller');
const { validateToken } = require('../authentication/createToken');

router.get('/', validateToken, userController.getAll);
router.post('/', userController.createUser);

module.exports = router;