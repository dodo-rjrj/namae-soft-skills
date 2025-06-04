const Utilisateur = require('../models/Utilisateur')

exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body

  try {
    const utilisateur = await Utilisateur.findOne({ where: { email } })

    if (!utilisateur) {
      return res.status(404).json({ error: "Utilisateur non trouvé." })
    }

    if (utilisateur.mot_de_passe !== mot_de_passe) {
      return res.status(401).json({ error: "Mot de passe incorrect." })
    }

    return res.status(200).json({
      message: "Connexion réussie",
      utilisateur
    })
  } catch (error) {
    console.error("Erreur login :", error)
    res.status(500).json({ error: "Erreur serveur." })
  }
}
