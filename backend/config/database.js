// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('softskills_db', 'postgres', 'anass2012', {
  host: 'postgres',
  dialect: 'postgres',
  port: 5432,
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('✅ Connexion à la base de données réussie !');
  })
  .catch((err) => {
    console.error('❌ Connexion échouée :', err.message);
  });

module.exports = sequelize;
