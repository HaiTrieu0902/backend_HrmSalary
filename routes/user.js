const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middlewareController = require('../controllers/middlewareController');

/* get list user  */
router.get('/get-list-user', middlewareController.verifyToken, userController.getAllUSer);
router.get('/get-detail/:id', middlewareController.verifyToken, userController.getDetailUser);

router.delete('/detele-user/:id', middlewareController.verifyTokenRoleAdmin, userController.deleteUsers);

module.exports = router;
