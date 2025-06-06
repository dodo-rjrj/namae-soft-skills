const Utilisateur = require('../models/Utilisateur');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const envoyerMail = require('../utils/sendMail');

// Fonction pour ajouter un utilisateur
exports.ajouterUtilisateur = async (req, res) => {
  const {
    nom,
    prenom,
    email,
    role,
    date_inscription,
    promotion,
    filiere,
    cycle,
    specialite,
    departement,
    poste,
    niveau_access
  } = req.body;

  // Validation des données obligatoires
  if (!nom || !prenom || !email || !role) {
    return res.status(400).json({ error: 'Les champs nom, prénom, email et rôle sont obligatoires.' });
  }
  // Validation simple du format email
  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Email invalide.' });
  }

  // Définir la date d'inscription par défaut à la date actuelle si non fournie
  const dateInscription = date_inscription || new Date();

  try {
    // Générer un mot de passe par défaut
    const motDePasse = genererMotDePasse();
    const motDePasseHash = await bcrypt.hash(motDePasse, 10);

    // Préparer les données de l'utilisateur selon le rôle
    const utilisateurData = {
      nom,
      prenom,
      email,
      mot_de_passe: motDePasseHash,
      role,
      date_inscription: dateInscription
    };

    // Ajouter des champs spécifiques en fonction du rôle
    if (role === 'etudiant') {
      if (!promotion || !filiere || !cycle) {
        return res.status(400).json({ error: 'Les champs promotion, filière et cycle sont obligatoires pour un étudiant.' });
      }
      utilisateurData.promotion = promotion;
      utilisateurData.filiere = filiere;
      utilisateurData.cycle = cycle;
    } else if (role === 'enseignant') {
      if (!specialite || !departement) {
        return res.status(400).json({ error: 'Les champs spécialité et département sont obligatoires pour un enseignant.' });
      }
      utilisateurData.specialite = specialite;
      utilisateurData.departement = departement;
    } else if (role === 'administrateur') {
      if (!poste || !niveau_access) {
        return res.status(400).json({ error: 'Les champs poste et niveau d\'accès sont obligatoires pour un administrateur.' });
      }
      utilisateurData.poste = poste;
      utilisateurData.niveau_access = niveau_access;
    }

    // Créer l'utilisateur dans la base de données
    const nouvelUtilisateur = await Utilisateur.create(utilisateurData);

    const sujet = 'Création de votre compte utilisateur';
    const contenuHTML = `
  <p>Bonjour ${prenom},</p>
  <p>Bienvenue sur <strong>Namaa</strong>, votre plateforme de gestion des soft skills.</p>
  <p>Vous trouverez ci-dessous vos identifiants de connexion :</p>
  <ul>
    <li><strong>Email :</strong> ${email}</li>
    <li><strong>Mot de passe :</strong> ${motDePasse}</li>
  </ul>
  <p>Merci de vous connecter et de changer votre mot de passe dès que possible.</p>
  <p>Cordialement,<br>L'équipe Namaa</p>
`;

    try {
      await envoyerMail(email, sujet, contenuHTML);
    } catch (err) {
      console.error('Échec de l’envoi de l’e-mail, mais utilisateur créé.');
    }

    // Répondre avec le succès
    res.status(201).json({
      message: 'Utilisateur ajouté avec succès',
      utilisateur: nouvelUtilisateur,
      motDePasseGenere: motDePasse // Tu peux afficher ça à l’admin
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Fonction utilitaire pour générer un mot de passe aléatoire
function genererMotDePasse(longueur = 8) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let motDePasse = '';
  for (let i = 0; i < longueur; i++) {
    motDePasse += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return motDePasse;
}


exports.mettreAJourUtilisateur = async (req, res) => {
  const { id } = req.params;
  const donnees = req.body;

  try {
    const utilisateur = await Utilisateur.findOne({ where: { id_utilisateur: id } });

    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    // Mettre à jour uniquement les champs envoyés dans req.body
    Object.keys(donnees).forEach(cle => {
      if (donnees[cle] !== undefined) {
        utilisateur[cle] = donnees[cle];
      }
    });

    await utilisateur.save();

    res.status(200).json({
      message: 'Utilisateur mis à jour avec succès',
      utilisateur
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


exports.supprimerUtilisateur = async (req, res) => {
  const { id } = req.params;

  try {
    const utilisateur = await Utilisateur.findByPk(id);

    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    await utilisateur.destroy();

    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};


exports.rechercherUtilisateur = async (req, res) => {
  const { nom, email, role } = req.query;

  const whereClause = { [Op.and]: [] };

  if (nom) {
    whereClause[Op.and].push({ nom: { [Op.iLike]: `%${nom}%` } });
  }

  if (email) {
    whereClause[Op.and].push({ email: { [Op.iLike]: `%${email}%` } });
  }

  if (role && role !== 'tous') {
    whereClause[Op.and].push({ role });
  }

  if (whereClause[Op.and].length === 0) {
    return res.status(400).json({ error: 'Fournissez au moins un critère de recherche.' });
  }

  try {
    console.log('➡️ whereClause:', JSON.stringify(whereClause, null, 2)); // 🔍 debug dans le terminal

    const utilisateurs = await Utilisateur.findAll({ where: whereClause });

    res.status(200).json({ utilisateurs });
  } catch (error) {
    console.error('❌ Sequelize exploded here:', error); // 💥 stacktrace
    res.status(500).json({ error: 'Erreur serveur lors de la recherche.' });
  }
};

exports.getAllUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll();
    res.status(200).json(utilisateurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};
