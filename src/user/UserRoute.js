const router = require('express').Router();
const UserController = require('./UserController');

router.post('/signUp', UserController.signUp);

module.exports = router;