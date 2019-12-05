const router = require('express').Router();
const AuthController = require('./AuthController');

router.post('/sign-in' , AuthController.signIn);

module.exports = router;