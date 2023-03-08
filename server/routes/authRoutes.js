const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

require("dotenv").config();
require("./db").connect();

router.post('/register', authController.userSignup);

router.post('/login', authController.userLogin);