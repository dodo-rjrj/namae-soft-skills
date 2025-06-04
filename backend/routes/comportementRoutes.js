const express = require('express');
const router = express.Router();
const comportementController = require('../controllers/comportementController');

// Ajouter un comportement
router.post('/ajouter', comportementController.ajouterComportement);

// Modifier un comportement
router.put('/:id_comportement', comportementController.modifierComportement);

// Supprimer un comportement
router.delete('/:id_comportement', comportementController.supprimerComportement);

// Rechercher des comportements
router.get('/rechercher', comportementController.rechercherComportement);

// Obtenir tous les comportements
router.get('/all', comportementController.getAllComportements);

module.exports = router;
