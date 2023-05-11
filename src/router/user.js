const router = require('express').Router();
const { userController } = require('../controller');
const validationToken = require('../middleware/validationToken');

router.get('/', validationToken, userController.getAll);
router.post('/', userController.createUser);
router.delete('/me', validationToken, userController.deleteUser);
router.get('/:id', validationToken, userController.getById);

module.exports = router;