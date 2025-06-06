exports.getSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    // TODO: récupère les paramètres utilisateur depuis la DB
    res.status(200).json({ message: `Paramètres de l'utilisateur ${userId}` });
  } catch (error) {
    console.error('Erreur getSettings:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des paramètres.' });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { ...settings } = req.body;
    // TODO: update les paramètres utilisateur en DB
    res.status(200).json({ message: `Paramètres mis à jour pour l'utilisateur ${userId}`, settings });
  } catch (error) {
    console.error('Erreur updateSettings:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour des paramètres.' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    // TODO: vérifier currentPassword, hasher newPassword, enregistrer
    res.status(200).json({ message: 'Mot de passe changé avec succès.' });
  } catch (error) {
    console.error('Erreur changePassword:', error);
    res.status(500).json({ error: 'Erreur serveur lors du changement de mot de passe.' });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    // TODO: supprimer l'utilisateur de la DB
    res.status(200).json({ message: `Compte utilisateur ${userId} supprimé.` });
  } catch (error) {
    console.error('Erreur deleteAccount:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du compte.' });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    // TODO: gérer l'upload d'avatar (avec multer par exemple), enregistrer le chemin en DB
    res.status(200).json({ message: `Avatar mis à jour pour l'utilisateur ${userId}` });
  } catch (error) {
    console.error('Erreur uploadAvatar:', error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'upload de l\'avatar.' });
  }
};
