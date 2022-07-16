const userModel = require('../database/models');

const userService = {  
  async getUserList() {
    const usersList = await userModel.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return usersList;
  },

  async validateParamsId(value) {
    if (!value || value !== Number || value <= 0) {
      const error = new Error('Invalid "id"');
      error.name = 'invalidId';

      throw error;
    }
    return value;
  },

  async getUserById(id) {
    const userById = await userModel.User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    const user = userById.toJSON();

    return user;
  },

  async getUserByEmail({ email, password }) {
    const userByEmail = await userModel.User.findOne({
      where: { email },
      raw: true,
    });

    if (!userByEmail || userByEmail.password !== password) {
      const error = new Error('Invalid fields');
      error.name = 'invalidField';
      throw error;
    }
    return userByEmail;
  },
};

module.exports = userService;