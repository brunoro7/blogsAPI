const categoryModel = require('../database/models');

const categoryService = {  
  async addCategory(dataCategory) {
    const newCategory = await categoryModel.Category.create(dataCategory);

    return newCategory;
  },

  async validateObjBodyAdd(objValue) {
    const { name } = objValue;

    if (!name) {
      const error = new Error('"name" is required');
      error.name = 'nameIsRequired';
      throw error;
    }
    return objValue;
  },

  async getCategoryList() {
    const categoryList = await categoryModel.Category.findAll();
    return categoryList;
  },

  async validateParamsId(id) {
    if (!id || Number(id) <= 0) {
      const error = 'invalidId';

      throw error;
    }
    return id;
  },

  async getCategoryById(id) {
    const categoryById = await categoryModel.Category.findByPk(id);
    if (!categoryById) {
      const error = new Error('Category does not exist');
      error.name = 'unknownCategory';
      
      throw error;
    }
    const category = categoryById.toJSON();
    
    return category;
  },
};

module.exports = categoryService;