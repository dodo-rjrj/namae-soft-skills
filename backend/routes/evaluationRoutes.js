const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

router.get('/total', evaluationController.getTotalEvaluations);
router.get('/moyenne', evaluationController.getMoyenneGlobale);
router.get('/moyenne-par-competence', evaluationController.getMoyenneParCompetence);
router.get('/par-jour', evaluationController.getEvaluationsParJour);


module.exports = router;

