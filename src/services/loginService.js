const loginService = {
  async validateFields(objValue) {
    const { email, password } = objValue;

    if (!email || !password) {
      const error = new Error('Some required fields are missing');
      error.name = 'missingField';
      throw error;
    }

    return objValue;
  },
};

module.exports = loginService;
