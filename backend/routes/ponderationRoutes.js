const express = require('express');
const router = express.Router();
const ponderationController = require('../controllers/ponderationController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.get('/', authenticate, authorize('administrateur'), ponderationController.getPonderation);
router.post('/', authenticate, authorize('administrateur'), ponderationController.createPonderation);
router.put('/:id', authenticate, authorize('administrateur'), ponderationController.updatePonderation);

module.exports = router;
