const Permission = require('../models/permission');

exports.createPermission = async (req, res) => {
  try {
    const {
      role,
      creerUtilisateurs,
      modifierUtilisateurs,
      supprimerUtilisateurs,
      creerCompetences,
      modifierCompetences,
      supprimerCompetences,
      voirRapports,
      exporterDonnees,
      anonymat
    } = req.body;

    const existing = await Permission.findOne({ where: { role } });
    if (existing) {
      return res.status(400).json({ message: "Ce rôle existe déjà." });
    }

    const newPermission = await Permission.create({
      role,
      creerUtilisateurs,
      modifierUtilisateurs,
      supprimerUtilisateurs,
      creerCompetences,
      modifierCompetences,
      supprimerCompetences,
      voirRapports,
      exporterDonnees,
      anonymat
    });

    res.status(201).json(newPermission);
  } catch (error) {
    console.error("Erreur Sequelize :", error); // ✅ Log dans la console
    res.status(500).json({ message: "Erreur lors de la création", error: error.message });
  }
};

exports.getAllPermissions = async (req, res) => {
  try {
    const permission = await Permission.findAll();
    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.updatePermissionByRole = async (req, res) => {
  const { role } = req.params;
  const data = req.body;

  try {
    const permission = await Permission.findOne({ where: { role } });

    if (!permission) {
      return res.status(404).json({ message: 'Rôle non trouvé' });
    }

    await permission.update(data);
    res.json({ message: 'Permission mise à jour avec succès', permission });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
  }
};
