const blogPostService = require('../services/blogPostService');
const authService = require('../middlewares/authService');

const blogPostController = {  
  /** @type {import('express').RequestHandler} */
  async getPostList(_req, res) {
    const categoryList = await blogPostService.getPostList();
    res.status(200).json(categoryList);
  },

  // async getCategoryById(req, res) {
  //   const id = await blogPostService.validateParamsId(req.params.id);
  //   const category = await blogPostService.getCategoryById(id);
    
  //   res.status(200).json(category);
  // },

  async addPost(req, res) {
    // valida o corpo
    const validBodyAdd = await blogPostService.validatePostBodyAdd(req.body);
    // console.log('BODY NO CONTROLLER', validBodyAdd);
    // const test = await blogPostService.validatePostBodyAddCatIds(validBodyAdd);

    // confere os categoryIds
    await blogPostService.validatePostCategoryIds(validBodyAdd);

    // pego o userId;
    const token = (req.headers.authorization);
    const data = await authService.validateToken(token);
    const idUserByToken = data.id;
    
    // monto o obj para o post
    const objNewPost = {
      ...validBodyAdd,
      userId: idUserByToken,
      updated: new Date(),
      published: new Date(),
    };

    console.log(objNewPost);
    
    // mando criar o post em BlogPost
    const newPost = await blogPostService.addPost(objNewPost);
    // mando criar o post em PostCategory
    await blogPostService.helpCreatePostCategory({ validBodyAdd, newPost });
    
    res.status(201).json(newPost.dataValues);
  },
};

module.exports = blogPostController;
