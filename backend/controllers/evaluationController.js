const { Evaluation, Competence, sequelize } = require('../models');

exports.getTotalEvaluations = async (req, res) => {
  try {
    const total = await Evaluation.count();
    res.json({ totalEvaluations: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getMoyenneGlobale = async (req, res) => {
  try {
    const result = await Evaluation.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('note')), 'moyenne']]
    });

    if (result.length > 0) {
      const moyenne = result[0].get('moyenne');
      res.json({ moyenne: moyenne ? parseFloat(moyenne).toFixed(2) : null });
    } else {
      res.json({ moyenne: null });
    }
  } catch (error) {
    console.error('Erreur getMoyenneGlobale:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getMoyenneParCompetence = async (req, res) => {
  try {
    const result = await Evaluation.findAll({
      attributes: [
        'id_competence',
        [sequelize.fn('AVG', sequelize.col('note')), 'moyenne']
      ],
      group: ['Evaluation.id_competence', 'competence.id_competence', 'competence.nom'], // <-- corriger ici
      include: [{
        model: Competence,
        as: 'competence',
        attributes: ['id_competence', 'nom']
      }]
    });

    const response = result.map(r => ({
      competence: r.competence.nom,
      moyenne: parseFloat(r.get('moyenne')).toFixed(2)
    }));

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getEvaluationsParJour = async (req, res) => {
  try {
    const evaluationsParJour = await Evaluation.findAll({
      attributes: [
        [sequelize.literal(`TO_CHAR("Evaluation"."date", 'Dy')`), 'jour'],
        [sequelize.literal(`TO_CHAR("Evaluation"."date", 'D')`), 'ordre'],
        [sequelize.literal(`COUNT(*)`), 'nombre'],
      ],
      group: [
        sequelize.literal(`TO_CHAR("Evaluation"."date", 'Dy')`),
        sequelize.literal(`TO_CHAR("Evaluation"."date", 'D')`)
      ],
      order: [sequelize.literal(`TO_CHAR("Evaluation"."date", 'D') ASC`)],
    });

    res.status(200).json(evaluationsParJour);
  } catch (error) {
    console.error('Erreur dans getEvaluationsParJour:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
