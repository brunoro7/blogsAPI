const userModel = require('../database/models');

const userService = {  
  async validateUserToken(authorization) {
    if (!authorization) {
      const error = new Error('Token not found');
      error.name = 'tokenNotFound';
      throw error;
    }
  },

  // async checkToken(userData) {
  //   const { email } = userData;
  //   const result = await userModel.User.findOne({
  //     where: { email },
  //     raw: true,
  //   });

  //   console.log('userService retorna obj', result);
  //   console.log('userService', result.email, userData.email);

  //   if (!result || result.email !== userData.email) {
  //     const error = new Error('Expired or invalid token');
  //     error.name = 'invalidToken';
  //     throw error;
  //   }
  //   return userData;
  // },

  async addUser(dataUser) {
    const newUser = await userModel.User.create(dataUser);

    return newUser;
  },

  async validateObjBodyAdd(objValue) {
    const { displayName, email, password, image } = objValue;

    if (!displayName || !email || !password || !image) {
      const error = 'missingField';
      throw error;
    }
    return objValue;
  },

  async validateEmailAdd(objValue) {
    const { email } = objValue;

    const validEmail = /^[^@]+@[^@]+\.[^@]+$/i.test(email);
    if (!validEmail) {
      const error = new Error('"email" must be a valid email');
      error.name = 'passLength';
      throw error;
    }

    const duplicatedEmail = await userModel.User.findOne({
      where: { email },
      raw: true,
    });

    if (duplicatedEmail !== null) {
      const error = new Error('User already registered');
      error.name = 'duplicatedEmail';
      throw error;
    }

    return objValue;
  },

  async validateNameAndPassAdd(objValue) {
    const { displayName, password } = objValue;

    if (displayName.length < 8) {
      const error = new Error('"displayName" length must be at least 8 characters long');
      error.name = 'nameLength';
      throw error;
    }

    if (password.length < 6) {
      const error = new Error('"password" length must be at least 6 characters long');
      error.name = 'passLength';
      throw error;
    }
    return objValue;
  },
  
  async getUserList() {
    const usersList = await userModel.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return usersList;
  },

  async validateParamsId(id) {
    if (!id || Number(id) <= 0) {
      const error = new Error('Invalid "id"');
      error.name = 'invalidId';

      throw error;
    }
    return id;
  },

  async getUserById(id) {
    const userById = await userModel.User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!userById) {
      const error = new Error('User does not exist');
      error.name = 'unknownUser';
      
      throw error;
    }
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