const {checkCache} = require("../../middleware/cache");

const router = require('express').Router();
const PostController = require('./PostController');
const {checkToken} = require("../../middleware/checkToken");

router.post('/create-post', checkToken, PostController.createPost);

router.get('/get-all',
    (req, res, next) => checkCache(req, res, next, `posts-getAll`),
    PostController.getAll);

router.get('/get-by-id/:id', PostController.getById);

router.get('/get-by-slug/:slug',
    (req, res, next) => checkCache(req, res, next, `posts-getBySlug-${req.params.slug}`),
    PostController.getBySlug);

router.get('/get-recent/:page',
    (req, res, next) => checkCache(req, res, next, `posts-getRecent-${req.params.page}`),
    PostController.getRecent);

router.get('/get-trending',
    (req, res, next) => checkCache(req, res, next, `posts-getTrending`),
    PostController.getTrending);

router.get('/get-by-category/:category/:page',
    (req, res, next) => checkCache(req, res, next, `posts-getByCategory-${req.params.category}-${req.params.page}`),
    PostController.getByCategory);

router.get('/get-by-tag/:tag/:page',
    (req, res, next) => checkCache(req, res, next, `posts-getByTag-${req.params.tag}-${req.params.page}`),
    PostController.getByTag);
router.put('/update-post', checkToken, PostController.updatePost);
router.delete('/delete-post', checkToken, PostController.deletePost);

module.exports = router;