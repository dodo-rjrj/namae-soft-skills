const express = require('express');
const router = express.Router();
const comportementController = require('../controllers/comportementController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

// ─── Public or Unsecured Routes ─────────────────────────────────────────────
// Ajouter un comportement
router.post('/ajouter', comportementController.ajouterComportement);

// Modifier un comportement (consider adding authentication if needed)
router.put('/:id_comportement', comportementController.modifierComportement);

// Supprimer un comportement (consider adding authentication if needed)
router.delete('/:id_comportement', comportementController.supprimerComportement);

// Rechercher des comportements
router.get('/rechercher', comportementController.rechercherComportements);

// ─── Routes requiring Authentication and Admin Rights ─────────────────────────
router.get('/', authenticate, authorize('administrateur'), comportementController.getAllComportements);
router.get('/:id', authenticate, authorize('administrateur'), comportementController.getComportementById);
router.put('/:id/valider', authenticate, authorize('administrateur'), comportementController.validerComportement);
router.put('/:id/rejeter', authenticate, authorize('administrateur'), comportementController.rejeterComportement);

module.exports = router;