const router = require('express').Router();
const { categoryController } = require('../controller');
const validationToken = require('../middleware/validationToken');

router.get('/', validationToken, categoryController.getAll);
router.post('/', validationToken, categoryController.createCategory);

module.exports = router;