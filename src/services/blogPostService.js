const blogPostModel = require('../database/models');

const blogPostService = {
  async helpCreatePostCategory(ObjValidBody) {
    const { validBodyAdd: { categoryIds } } = (ObjValidBody);
    const { newPost: { id } } = (ObjValidBody);

    const eachPostCategory = categoryIds.map((catId) => ({
      postId: id,
      categoryId: catId,
    }));
    await blogPostModel.PostCategory.bulkCreate(eachPostCategory);
    return ObjValidBody;
  },

  async addPost(dataPost) {
    const newDataPost = await blogPostModel.BlogPost.create(dataPost);
    
    return newDataPost;
  },

  async validatePostCategoryIds(objValue) {
    const { categoryIds } = objValue;
    // if (!categoryIds || categoryIds.length <= 0) {
    //   const error = 'missingField';
    //   throw error;
    // }

    const checkIdCat = await Promise.all(
      categoryIds.map((categoryId) => blogPostModel.Category.findOne({
        where: { id: categoryId }, raw: true,
      })),
    );
    const testIdInArray = checkIdCat.every((exitId) => exitId);

    if (!testIdInArray) {
      const error = new Error('"categoryIds" not found');
      error.name = 'categoryNotFound';
      throw error;
    }
  },

  // async validatePostBodyAddCatIds(objValue) {
  //   const { categoryIds } = objValue;
    
  //   if (categoryIds.length < 1) {
  //     const error = 'missingField';
  //     throw error;
  //   }
  //   return objValue;
  // },
  
  async validatePostBodyAdd(objValue) {
    const { title, content } = objValue;

    if (title === '' || content === '') {
        const error = new Error('Some required fields are missing');
        error.name = 'missingFieldBodyPost';
        // error.name = 'missingField';
        throw error;
    }
    return objValue;
  },

  async getPostList() {
    const categoryList = await blogPostModel.BlogPost.findAll();
    return categoryList;
  },
};

module.exports = blogPostService;