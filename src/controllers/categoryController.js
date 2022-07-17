const categoryService = require('../services/categoryService');

const categoryController = {  
  /** @type {import('express').RequestHandler} */
  async getCategoryList(req, res) {
    const categoryList = await categoryService.getCategoryList();
    res.status(200).json(categoryList);
  },

  async getCategoryById(req, res) {
    const id = await categoryService.validateParamsId(req.params.id);
    const category = await categoryService.getCategoryById(id);
    
    res.status(200).json(category);
  },

  async addCategory(req, res) {
    const validBodyAdd = await categoryService.validateObjBodyAdd(req.body);
    const createdCategory = await categoryService.addCategory(validBodyAdd);

    const category = await categoryService.getCategoryById(createdCategory.dataValues.id);
    
    res.status(201).json(category);
  },
};

module.exports = categoryController;
