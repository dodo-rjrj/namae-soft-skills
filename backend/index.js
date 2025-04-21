const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Utilise le port de l'environnement ou 3000 par défaut

// Une route de test
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Démarre le serveur avec gestion des erreurs
app.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1); // Ferme le processus en cas d'erreur
  }
  console.log(`Backend is listening at http://localhost:${port}`);
});