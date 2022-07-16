const userService = require('../services/userService');

const userController = {  
  /** @type {import('express').RequestHandler} */
  async getUserList(_req, res) {
    const resultList = await userService.getUserList();
    
    res.status(200).json(resultList);
  },

  async getUserById(req, res) {
    const result = await userService.getUserById(req.params.id);
    
    res.status(200).json(result);
  },
};

module.exports = userController;