const express = require('express');
const router = express.Router();
const comportementController = require('../controllers/comportementController');

// Routes principales
router.get('/', comportementController.getAllComportements);
router.get('/:id', comportementController.getComportementById);
router.put('/:id/valider', comportementController.validerComportement);
router.put('/:id/rejeter', comportementController.rejeterComportement);

module.exports = router;
