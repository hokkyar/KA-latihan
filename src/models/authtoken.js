'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authToken extends Model {
    static associate(models) {
      // define association here
    }
  }
  authToken.init({
    token: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'authToken',
  });
  return authToken;
};