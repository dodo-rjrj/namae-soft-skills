const bcrypt = require('bcryptjs');

const motDePasseClair = 'admin';
bcrypt.hash(motDePasseClair, 10, (err, hash) => {
    if (err) throw err;
    console.log('Mot de passe hashé :', hash);
});
// mot de passe hashé: $2b$10$zIzPofo/XdqpmywAPkyOjO5XdL8yRXFjT2Dm5qqg/xEU7hC/TGUGm
/*
INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, role, date_inscription, poste, niveau_access)
VALUES (
  'Admin',
  'Principal',
  'admin@example.com',
  '$2b$10$zIzPofo/XdqpmywAPkyOjO5XdL8yRXFjT2Dm5qqg/xEU7hC/TGUGm',
  'administrateur',
  NOW(),
  'Super Admin',
  'niveau 1'
);
*/