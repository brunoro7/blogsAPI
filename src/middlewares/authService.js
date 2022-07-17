require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtService = {
  async createToken(user) {
    const { password: _, ...userNoPass } = user;

    console.log('retirando password', userNoPass);

    const token = jwt.sign({ data: userNoPass }, process.env.JWT_SECRET, {
      expiresIn: '15d',
      algorithm: 'HS256',
    });

    return token;
  },
  
  async validateToken(token) {
    if (!token) {
      const error = new Error('Token not found');
      error.name = 'tokenNotFound';
      throw error;
    }

    const { data } = jwt.verify(token, process.env.JWT_SECRET);

    if (!data) {
      const error = new Error('Expired or invalid token');
      error.name = 'invalidToken';
      throw error;
    }

    return data;
  },
};

module.exports = jwtService;