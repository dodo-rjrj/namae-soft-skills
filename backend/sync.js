// sync.js
const sequelize = require('./config/database');
const Utilisateur = require('./models/Utilisateur'); // importe tous tes modèles ici

(async () => {
  try {
    await sequelize.sync({ force: true }); // change à false si tu veux garder les données
    console.log('✅ Base de données synchronisée avec succès !');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation :', error.message);
    process.exit(1);
  }
})();
