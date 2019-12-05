const router = require('express').Router();
const PostController = require('./PostController');

router.post('/create-post', PostController.createPost);
router.get('/get-all', PostController.getAll);
router.get('/get-by-id/:id', PostController.getById);
router.get('/get-by-slug/:slug', PostController.getBySlug);
router.put('/update-post', PostController.updatePost);
router.delete('/delete-post' , PostController.deletePost);

module.exports = router;