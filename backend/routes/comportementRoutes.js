const express = require('express');
const router = express.Router();
const comportementController = require('../controllers/comportementController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

// Routes principales
router.get('/', authenticate, authorize('administrateur'), comportementController.getAllComportements);
router.get('/:id', authenticate, authorize('administrateur'), comportementController.getComportementById);
router.put('/:id/valider', authenticate, authorize('administrateur'), comportementController.validerComportement);
router.put('/:id/rejeter', authenticate, authorize('administrateur'), comportementController.rejeterComportement);

module.exports = router;
