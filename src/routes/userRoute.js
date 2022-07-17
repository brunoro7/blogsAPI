const { Router } = require('express');
const userController = require('../controllers/userController');

const userRoute = Router();

userRoute.post('/', userController.addUser);
userRoute.get('/:id', userController.getUserById);
userRoute.get('/', userController.getUserList);

module.exports = userRoute;
