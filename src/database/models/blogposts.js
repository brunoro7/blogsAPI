const { DataTypes } = require('sequelize');
const atributtes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'published'
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated'
  }
};

module.exports = (sequelize) => {
/**
 * @param {import('sequelize').Sequelize} sequelize
*/

const model = sequelize.define('BlogPosts', atributtes, {
  tableName: 'BlogPosts',
  timestamps: false
});
return model;
};