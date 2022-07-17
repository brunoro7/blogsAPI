const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const verifyAuth = require('../middlewares/verifyAuth');

const userRoute = Router();

userRoute.post('/', verifyAuth, categoryController.addCategory);
userRoute.get('/', verifyAuth, categoryController.getCategoryList);

module.exports = userRoute;
