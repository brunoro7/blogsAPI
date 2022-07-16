const { Router } = require('express');
const loginController = require('../controllers/loginController');

const loginRoute = Router();

loginRoute.post('/', loginController.postLogin);

module.exports = loginRoute;