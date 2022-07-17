const userService = require('../services/userService');
const authService = require('./authService');

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  await userService.validateUserToken(token);
  
  await authService.validateToken(token);
  next();
};
