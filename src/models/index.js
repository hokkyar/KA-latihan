'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const UserModel = require('./user')
const ArticleModel = require('./article')
const AuthTokenModel = require('./authtoken')
const ProductModel = require('./product')
const AdminModel = require('./admin')
const CategoryModel = require('./category')

db.User = UserModel(sequelize, Sequelize)
db.Article = ArticleModel(sequelize, Sequelize)
db.AuthToken = AuthTokenModel(sequelize, Sequelize)
db.Product = ProductModel(sequelize, Sequelize)
db.Admin = AdminModel(sequelize, Sequelize)
db.Category = CategoryModel(sequelize, Sequelize)

db.Category.hasMany(db.Product, {
  as: 'product',
  foreignKey: 'catId'
})
db.Product.belongsTo(db.Category, {
  as: 'category',
  foreignKey: 'catId'
})


module.exports = db;
