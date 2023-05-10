const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models");

module.exports.sequelize = new Sequelize(
  "postgres",
  "postgres",
  "Joudarym123",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

module.exports.models = initModels(module.exports.sequelize);
