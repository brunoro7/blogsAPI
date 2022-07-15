const { DataTypes} = require('sequelize');
const atributtes = {
  // id: {
  //   allowNull: false,
  //   autoIncrement: true,
  //   primaryKey: true,
  //   type: DataTypes.INTEGER
  // },
  postId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'BlogPosts',
      key: 'id'
    }
  },
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
  // createdAt: {
  //   allowNull: false,
  //   type: DataTypes.DATE
  // },
  // updatedAt: {
  //   allowNull: false,
  //   type: DataTypes.DATE
  // }
};

module.exports = (sequelize) => {
/**
 * @param {import('sequelize').Sequelize} sequelize
*/

const model = sequelize.define('PostCategories', atributtes, {
  tableName: 'PostCategories',
  timestamps: false
});
return model;
};