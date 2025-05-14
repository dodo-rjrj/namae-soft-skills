const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

router.post('/ajouter', utilisateurController.ajouterUtilisateur);
router.patch('/modifier/:id', utilisateurController.mettreAJourUtilisateur);
router.delete('/supprimer/:id', utilisateurController.supprimerUtilisateur);
router.get('/rechercher', utilisateurController.rechercherUtilisateur);

module.exports = router;
