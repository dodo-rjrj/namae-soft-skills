const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.get('/total', authenticate, authorize('administrateur'), evaluationController.getTotalEvaluations);
router.get('/moyenne', authenticate, authorize('administrateur'), evaluationController.getMoyenneGlobale);
router.get('/moyenne-par-competence', authenticate, authorize('administrateur'), evaluationController.getMoyenneParCompetence);
router.get('/par-jour', authenticate, authorize('administrateur'), evaluationController.getEvaluationsParJour);
router.get('/par-mois', authenticate, authorize('administrateur'), evaluationController.getEvaluationsParMois);
router.get('/stats', authenticate, authorize('administrateur'), evaluationController.getStatsFiltrées);


module.exports = router;


