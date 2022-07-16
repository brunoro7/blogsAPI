const { DataTypes } = require('sequelize');
const atributtes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  // createdAt: {
  //   allowNull: false,
  //   type: Sequelize.DATE
  // },
  // updatedAt: {
  //   allowNull: false,
  //   type: Sequelize.DATE
  // }
};

module.exports = (sequelize) => {
/**
 * @param {import('sequelize').Sequelize} sequelize
*/

  const model = sequelize.define('Categories', atributtes, {
    tableName: 'Categories',
    timestamps: false
  });
  return model;
};