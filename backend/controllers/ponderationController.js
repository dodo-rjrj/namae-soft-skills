const Ponderation = require('../models/ponderation');

// Obtenir la pondération (on suppose qu'il n'y en a qu'une seule)
exports.getPonderation = async (req, res) => {
  try {
    const ponderation = await Ponderation.findOne();
    if (!ponderation) {
      return res.status(404).json({ message: "Aucune pondération trouvée." });
    }
    res.json(ponderation);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Créer une nouvelle pondération
exports.createPonderation = async (req, res) => {
  try {
    const { professeurs, pairs, autoEvaluation, professionnels } = req.body;

    // Validation simple
    const total = professeurs + pairs + autoEvaluation + professionnels;
    if (total !== 100) {
      return res.status(400).json({ message: "La somme des pondérations doit être égale à 100." });
    }

    const newPonderation = await Ponderation.create({
      professeurs,
      pairs,
      autoEvaluation,
      professionnels
    });

    res.status(201).json(newPonderation);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création', error: err.message });
  }
};

// Mettre à jour la pondération
exports.updatePonderation = async (req, res) => {
  try {
    const { id } = req.params;
    const { professeurs, pairs, autoEvaluation, professionnels } = req.body;

    const total = professeurs + pairs + autoEvaluation + professionnels;
    if (total !== 100) {
      return res.status(400).json({ message: "La somme des pondérations doit être égale à 100." });
    }

    const [updated] = await Ponderation.update({
      professeurs,
      pairs,
      autoEvaluation,
      professionnels
    }, {
      where: { id }
    });

    if (updated === 0) {
      return res.status(404).json({ message: "Pondération non trouvée pour mise à jour." });
    }

    res.json({ message: "Pondération mise à jour." });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: err.message });
  }
};
