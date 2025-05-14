const express = require('express');
const router = express.Router();
const { createSelfEvaluation, getEvaluationsByStudent } = require('../controllers/evaluationController');

// Route : POST /evaluations/self
router.post('/self', createSelfEvaluation);
router.get('/evaluations/student/:studentId', getEvaluationsByStudent);

module.exports = router;
