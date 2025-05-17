const express = require('express');
const utilisateurRoutes = require('./routes/utilisateurRoutes'); // Importer les routes utilisateurs
const competenceRoutes = require('./routes/competenceRoutes');
const ponderationRoutes = require('./routes/ponderationRoutes');
const permissionsRoutes = require('./routes/permissionsRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');

const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());
// Middleware pour éviter l'erreur sur les requêtes GET avec Content-Type application/json sans body
app.use((req, res, next) => {
  if (req.method === 'GET' && req.headers['content-type'] === 'application/json') {
    delete req.headers['content-type'];
  }
  next();
});

// Utilisation des routes pour les utilisateurs
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/competences', competenceRoutes);
app.use('/api/ponderation', ponderationRoutes);
app.use('/api/permissions', permissionsRoutes);
app.use('/evaluations', evaluationRoutes);


// Une route de test pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Hello World! I am here');
});

module.exports = app;
