const userService = require('../services/userService');
const authService = require('../middlewares/authService');

const userController = {  
  /** @type {import('express').RequestHandler} */
  async getUserList(req, res) {
    const resultList = await userService.getUserList();
    res.status(200).json(resultList);
  },

  async getUserById(req, res) {
    const id = await userService.validateParamsId(req.params.id);
    const user = await userService.getUserById(id);
    
    res.status(200).json(user);
  },

  async addUser(req, res) {
    const { displayName, password } = await userService.validateNameAndPassAdd(req.body);
    const { email } = await userService.validateEmailAdd(req.body);
    const { image } = req.body;
    const dataUser = { displayName, email, password, image };

    const validBodyAdd = await userService.validateObjBodyAdd(dataUser);
    const createdUser = await userService.addUser(validBodyAdd);
    const token = await authService.createToken(createdUser.dataValues);
    
    res.status(201).json({ token });
  },
};

module.exports = userController;
