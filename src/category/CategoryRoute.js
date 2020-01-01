const router = require('express').Router();
const CategoryController = require('./CategoryController');
const {checkCache} = require("../../middleware/cache");
//const {checkToken} = require("../../middleware/checkToken");

router.get('/get-all/:page',
    (req, res, next) => checkCache(req, res, next, `categories-getAll`),
    CategoryController.getAll);

module.exports = router;