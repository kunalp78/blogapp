const express = require('express');
const router = express.Router();
const{ requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth');
const{ read } = require('../controllers/user');
const user = require('../models/user');


router.get('/profile', requireSignin, adminMiddleware, read);


module.exports = router