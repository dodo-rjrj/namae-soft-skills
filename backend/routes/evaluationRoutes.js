const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');
const authenticate = require('../middlewares/authenticate');

router.get('/total', authenticate, evaluationController.getTotalEvaluations);
router.get('/moyenne', authenticate, evaluationController.getMoyenneGlobale);
router.get('/moyenne-par-competence', authenticate, evaluationController.getMoyenneParCompetence);
router.get('/par-jour', authenticate, evaluationController.getEvaluationsParJour);
router.get('/par-mois', authenticate, evaluationController.getEvaluationsParMois);
router.get('/stats', authenticate, evaluationController.getStatsFiltrées);


module.exports = router;


