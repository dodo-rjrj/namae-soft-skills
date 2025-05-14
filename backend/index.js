const express = require('express');
const sequelize = require('./config/database');
const utilisateurRoutes = require('./routes/utilisateurRoutes'); // Importer les routes utilisateurs
const competenceRoutes = require('./routes/competenceRoutes');

const app = express();
const port = process.env.PORT || 3009; // Port d'écoute

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Utilisation des routes pour les utilisateurs
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/competences', competenceRoutes);

// Une route de test pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Hello World! I am here');
});

// Connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connexion à la base de données réussie !');
    app.listen(port, () => {
      console.log(`🚀 Backend is listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Connexion à la base de données échouée :', err.message);
    process.exit(1); // Arrêter le serveur si la base de données échoue à se connecter
  });
