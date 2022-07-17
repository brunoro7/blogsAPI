const jwt = require('jsonwebtoken');
require('dotenv').config();
// const userModel = require('../database/models');

const jwtService = {
  async createToken(user) {
    const { password: _, ...userNoPass } = user;

    const token = jwt.sign({ data: userNoPass }, process.env.JWT_SECRET, {
      // expiresIn: '15d',
      algorithm: 'HS256',
    });

    return token;
  },
  
  async validateToken(token) {
    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET);
      return data;    
    } catch (_error) {
      const error = new Error('Expired or invalid token');
      error.name = 'invalidToken';
      throw error;
    }
  },
};

module.exports = jwtService;
