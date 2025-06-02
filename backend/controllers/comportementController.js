const Comportement = require('../models/Comportement');
const PlanAction = require('../models/PlanAction');
const TypeComportement = require('../models/TypeComportement');

// GET /api/comportements
exports.getAllComportements = async (req, res) => {
  try {
    const comportements = await Comportement.findAll({
      include: [
        { model: PlanAction },
        { model: TypeComportement }
      ]
    });
    res.json(comportements);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// GET /api/comportements/:id
exports.getComportementById = async (req, res) => {
  try {
    const comportement = await Comportement.findByPk(req.params.id, {
      include: [PlanAction, TypeComportement]
    });
    if (!comportement) return res.status(404).json({ message: 'Comportement non trouvé' });
    res.json(comportement);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// PUT /api/comportements/:id/valider
exports.validerComportement = async (req, res) => {
  try {
    const comportement = await Comportement.findByPk(req.params.id);
    if (!comportement) return res.status(404).json({ message: 'Comportement non trouvé' });

    comportement.statut = 'Validé';
    await comportement.save();

    res.json({ message: 'Comportement validé avec succès', comportement });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la validation', error: err.message });
  }
};

// PUT /api/comportements/:id/rejeter
exports.rejeterComportement = async (req, res) => {
  try {
    const comportement = await Comportement.findByPk(req.params.id);
    if (!comportement) return res.status(404).json({ message: 'Comportement non trouvé' });

    comportement.statut = 'Rejeté';
    await comportement.save();

    res.json({ message: 'Comportement rejeté', comportement });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors du rejet', error: err.message });
  }
};