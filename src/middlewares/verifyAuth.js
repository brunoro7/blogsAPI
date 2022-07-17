const authService = require('./authService');

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  await authService.verifyToken(token);
  
  await authService.validateToken(token);
  next();
};
