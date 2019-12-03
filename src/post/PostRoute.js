const router = require('express').Router();
const PostController = require('./PostController');

router.post('/create-post', PostController.createPost);
router.get('/get-all', PostController.getAll);

module.exports = router;