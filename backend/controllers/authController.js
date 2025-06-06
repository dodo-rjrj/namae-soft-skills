const Utilisateur = require('../models/Utilisateur');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    const { email, mot_de_passe } = req.body;
    try {
        const utilisateur = await Utilisateur.findOne({ where: { email } });

        if (!utilisateur) {
            return res.status(401).json({ error: 'Utilisateur non trouvé.' });
        }

        // TEMPORARY: Direct comparison for plain text passwords
        const motDePasseValide = mot_de_passe === utilisateur.mot_de_passe;

        if (!motDePasseValide) {
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
        }

        // Génération du token JWT
        const token = jwt.sign(
            {
                id: utilisateur.id_utilisateur,
                role: utilisateur.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        res.status(200).json({
            message: 'Connexion réussie.',
            token,
            utilisateur: {
                id: utilisateur.id_utilisateur,
                nom: utilisateur.nom,
                prenom: utilisateur.prenom,
                email: utilisateur.email,
                role: utilisateur.role
            }
        });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};