const express = require('express');
const router = express.Router();
const ponderationController = require('../controllers/ponderationController');

router.get('/', ponderationController.getPonderation);
router.post('/', ponderationController.createPonderation);
router.put('/:id', ponderationController.updatePonderation);

module.exports = router;
