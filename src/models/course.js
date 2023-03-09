'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {

    static associate(models) {
      // define association here
    }
  }
  course.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    requirement: DataTypes.STRING,
    age: DataTypes.STRING,
    meetings: DataTypes.STRING,
    period: DataTypes.STRING,
    duration: DataTypes.STRING,
    classConsist: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};