const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../auth');

router.get('/welcome', auth, authController.welcomeMessage);
//every request other than login and signup should pass through this verify token function

router.post('/signup', authController.userSignup);

router.post('/login', authController.userLogin);

router.post('/social', authController.socialLogin);

router.use('*', authController.handleAnyOtherCase);

module.exports = router;