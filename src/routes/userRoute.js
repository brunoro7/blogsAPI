const { Router } = require('express');
const userController = require('../controllers/userController');
const verifyAuth = require('../middlewares/verifyAuth');

const userRoute = Router();

userRoute.post('/', userController.addUser);
userRoute.get('/:id', verifyAuth, userController.getUserById);
userRoute.get('/', verifyAuth, userController.getUserList);

module.exports = userRoute;
