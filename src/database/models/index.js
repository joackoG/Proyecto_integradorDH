'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
<<<<<<< HEAD
const process = require('process');
=======
>>>>>>> eb3abd9340e676eea8aaefe5a53409b155d8837e
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
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
<<<<<<< HEAD
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
=======
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
>>>>>>> eb3abd9340e676eea8aaefe5a53409b155d8837e
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

module.exports = db;
