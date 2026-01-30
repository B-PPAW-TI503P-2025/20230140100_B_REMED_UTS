const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('library_geo_db', 'root', 'ComalMelati3', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3308
});

module.exports = sequelize;