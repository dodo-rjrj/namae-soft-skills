const Comportement = require('../models/Comportement');

// ➕ Ajouter un comportement
exports.ajouterComportement = async (req, res) => {
  try {
    const { id_competence, description, solution, date_signalement, statut } = req.body;

    if (!id_competence || !description) {
      return res.status(400).json({ error: 'Le champ "id_competence" et "description" sont obligatoires.' });
    }

    const comportement = await Comportement.create({
      id_competence,
      description,
      solution,
      date_signalement,
      statut
    });

    res.status(201).json({ message: 'Comportement ajouté', comportement });
  } catch (error) {
    console.error('Erreur ajout comportement:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ✏️ Modifier un comportement
exports.modifierComportement = async (req, res) => {
  try {
    const { id_comportement } = req.params;
    const comportement = await Comportement.findByPk(id_comportement);

    if (!comportement) return res.status(404).json({ error: 'Comportement non trouvé' });

    Object.assign(comportement, req.body);
    await comportement.save();

    res.json({ message: 'Modifié avec succès', comportement });
  } catch (error) {
    console.error('Erreur modif comportement:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ❌ Supprimer un comportement
exports.supprimerComportement = async (req, res) => {
  try {
    const { id_comportement } = req.params;
    const comportement = await Comportement.findByPk(id_comportement);

    if (!comportement) return res.status(404).json({ error: 'Comportement non trouvé' });

    await comportement.destroy();
    res.json({ message: 'Supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔍 Rechercher tous les comportements (option: par compétence)
exports.rechercherComportements = async (req, res) => {
  try {
    const { id_competence } = req.query;

    const where = id_competence ? { id_competence } : {};
    const comportements = await Comportement.findAll({ where });

    res.json(comportements);
  } catch (error) {
    console.error('Erreur recherche:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
