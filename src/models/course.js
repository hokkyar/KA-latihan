'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    static associate(models) {
      // define association here
    }
  }
  course.init({
    judul: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    tipe: DataTypes.STRING,
    harga: DataTypes.STRING,
    durasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};