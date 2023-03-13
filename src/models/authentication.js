'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authentication extends Model {
    static associate(models) {
      // define association here
    }
  }
  authentication.init({
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'authentication',
  });
  return authentication;
};