// config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('./config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging || false,
    port: config.port || 5432,  // optionnel, à ajuster si besoin
  }
);

sequelize.authenticate()
  .then(() => {
    console.log(`✅ Connexion à la base de données réussie (${process.env.NODE_ENV || 'development'}) !`);
  })
  .catch((err) => {
    console.error('❌ Connexion échouée :', err.message);
  });

module.exports = sequelize;