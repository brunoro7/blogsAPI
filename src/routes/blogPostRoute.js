const { Router } = require('express');
const blogPostController = require('../controllers/blogPostController');
const verifyAuth = require('../middlewares/verifyAuth');

const blogPostRoute = Router();

blogPostRoute.post('/', verifyAuth, blogPostController.addPost);
blogPostRoute.get('/', verifyAuth, blogPostController.getPostList);

module.exports = blogPostRoute;
