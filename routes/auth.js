const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const middlewareController = require('../controllers/middlewareController');

/* Resgister  */
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', middlewareController.verifyToken, authController.logout);
module.exports = router;
