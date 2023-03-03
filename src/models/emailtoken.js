'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class emailToken extends Model {
    static associate(models) {
      // define association here
    }
  }
  emailToken.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_user: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'emailToken',
  });
  return emailToken;
};