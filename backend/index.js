const express = require('express');
const sequelize = require('./config/database');
const utilisateurRoutes = require('./routes/utilisateurRoutes'); 
const competenceRoutes = require('./routes/competenceRoutes');
const ponderationRoutes = require('./routes/ponderationRoutes');
const permissionsRoutes = require('./routes/permissionsRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');

const app = express();
const port = process.env.PORT || 3009; // Port d'écoute
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

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
