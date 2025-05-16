const Competence = require('../models/Competence');
const { Op } = require('sequelize');

// Fonction pour ajouter une compétence
exports.ajouterCompetence = async (req, res) => {
  const { nom, description } = req.body;

  // Validation des données obligatoires
  if (!nom) {
    return res.status(400).json({ error: 'Le champ "nom" est obligatoire.' });
  }

  try {
    // Créer une nouvelle compétence dans la base de données
    const nouvelleCompetence = await Competence.create({
      nom,
      description
    });

    res.status(201).json({
      message: 'Compétence ajoutée avec succès',
      competence: nouvelleCompetence
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la compétence :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Fonction pour modifier une compétence
exports.modifierCompetence = async (req, res) => {
  const { id_competence } = req.params; // On récupère l'id de la compétence depuis les paramètres de l'URL
  const { nom, description } = req.body; // On récupère le nom et la description depuis le corps de la requête

  try {
    // On cherche la compétence avec l'id fourni
    const competence = await Competence.findByPk(id_competence);

    if (!competence) {
      return res.status(404).json({ error: 'Compétence non trouvée' });
    }

    // Mise à jour des champs
    if (nom) {
      competence.nom = nom;
    }

    if (description) {
      competence.description = description;
    }

    // Sauvegarder les changements
    await competence.save();

    res.status(200).json({
      message: 'Compétence mise à jour avec succès',
      competence
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la compétence :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Fonction pour supprimer une compétence
exports.supprimerCompetence = async (req, res) => {
  const { id_competence } = req.params; // On récupère l'ID de la compétence à supprimer depuis les paramètres

  try {
    // Chercher la compétence avant de la supprimer
    const competence = await Competence.findByPk(id_competence);

    if (!competence) {
      return res.status(404).json({ error: 'Compétence non trouvée' });
    }

    // Supprimer la compétence
    await competence.destroy();

    res.status(200).json({
      message: 'Compétence supprimée avec succès',
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la compétence :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


exports.rechercherCompetence = async (req, res) => {
  try {
    const search = req.query.search || '';

    const competences = await Competence.findAll({
      where: {
        [Op.or]: [
          { nom: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ]
      }
    });

    if (competences.length === 0) {
      return res.status(404).json({ message: 'Aucune compétence trouvée.' });
    }

    res.status(200).json(competences);
  } catch (error) {
    console.error('Erreur lors de la recherche :', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};