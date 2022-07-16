const loginService = require('../services/loginService');
const authService = require('../middlewares/authService');
const userService = require('../services/userService');

const loginController = {
  /** @type {import('express').RequestHandler} */

  async postLogin(req, res) {
    const data = await loginService.validateFields(req.body);
    const user = await userService.getUserByEmail(data);
    const token = await authService.createToken(user);
    
    res.status(200).json({ token });
  },
};

module.exports = loginController;