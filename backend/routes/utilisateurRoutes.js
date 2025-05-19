const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.post('/ajouter', authenticate, authorize('administrateur'), utilisateurController.ajouterUtilisateur);
router.patch('/modifier/:id', authenticate, authorize('administrateur'), utilisateurController.mettreAJourUtilisateur);
router.delete('/supprimer/:id', authenticate, authorize('administrateur'), utilisateurController.supprimerUtilisateur);
router.get('/rechercher', authenticate, authorize('administrateur'), utilisateurController.rechercherUtilisateur);

module.exports = router;
