const router = require('express').Router();
const { postController } = require('../controller');
const validationToken = require('../middleware/validationToken');

router.get('/', validationToken, postController.getAllUserPosts);
router.get('/search', validationToken, postController.fetchPost);
router.post('/', validationToken, postController.createPost);
router.get('/:id', validationToken, postController.getPostById);
router.put('/:id', validationToken, postController.updatePost);
router.delete('/:id', validationToken, postController.deletePost);

module.exports = router;