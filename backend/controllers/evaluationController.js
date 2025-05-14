// controllers/evaluationController.js
const { Evaluation } = require('../models');
const Etudiant = require('../models/Etudiant');

const createSelfEvaluation = async (req, res) => {
  try {
    const {
      note,
      commentaire,
      id_session,
      id_projet,
      id_utilisateur,     // étudiant connecté
      id_competence       // optionnel
    } = req.body;

    const evaluation = await Evaluation.create({
      type_evaluation: 'auto',
      note,
      commentaire,
      date: new Date(),
      statut: 'enregistrée',
      id_session,
      id_projet,
      id_utilisateur,
      id_competence
    });

    res.status(201).json({ message: 'Auto-évaluation créée avec succès', evaluation });
  } catch (error) {
    console.error('Erreur création auto-évaluation :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de l’auto-évaluation' });
  }
};

// Récupérer toutes les évaluations pour un étudiant donné
const getEvaluationsByStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Vérifier si l'étudiant existe
    const student = await Etudiant.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }

    // Récupérer les évaluations de l'étudiant
    const evaluations = await Evaluation.findAll({
      where: { id_utilisateur: studentId }, // Assumer que 'id_utilisateur' est lié à l'étudiant
    });

    if (evaluations.length === 0) {
      return res.status(404).json({ message: 'Aucune évaluation trouvée pour cet étudiant' });
    }

    res.status(200).json({ evaluations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { createSelfEvaluation, getEvaluationsByStudent };
