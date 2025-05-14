const express = require('express');
const competenceController = require('../controllers/competenceController');
const router = express.Router();

// Route pour ajouter une compétence
router.post('/ajouter', competenceController.ajouterCompetence);
router.put('/:id_competence', competenceController.modifierCompetence);
router.delete('/:id_competence', competenceController.supprimerCompetence);
router.get('/rechercher', competenceController.rechercherCompetence);

module.exports = router;
