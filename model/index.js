const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const config = require('../config');

const db = {};

const mysqlConnetion = mysql.createConnection(config.mysql);
mysqlConnetion.connect();

const curFile = path.basename(__filename); // index.js

const sequelize = new Sequelize(config.sequelize);
const queryInterface = sequelize.getQueryInterface();

queryInterface.dropAllTables().then(() => {
  queryInterface.createTable('Users', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    mobile: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });  
});

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== -1 && file !== curFile && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.mysql = mysqlConnetion;

module.exports = db;
