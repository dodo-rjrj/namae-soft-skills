const express = require('express');
const competenceController = require('../controllers/competenceController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const router = express.Router();

// Route pour ajouter une compétence
router.post('/ajouter', authenticate, authorize('administrateur'), competenceController.ajouterCompetence);
router.put('/:id_competence', authenticate, authorize('administrateur'), competenceController.modifierCompetence);
router.delete('/:id_competence', authenticate, authorize('administrateur'), competenceController.supprimerCompetence);
router.get('/rechercher', authenticate, authorize('administrateur'), competenceController.rechercherCompetence);

module.exports = router;
