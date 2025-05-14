const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Utilisateur = sequelize.define('Utilisateur', {
  id_utilisateur: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING, allowNull: false },
  prenom: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  mot_de_passe: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  date_inscription: { type: DataTypes.DATE },

  // Champs pour Étudiant
  promotion: { type: DataTypes.STRING },
  filiere: { type: DataTypes.STRING },
  cycle: { type: DataTypes.STRING },

  // Champs pour Enseignant
  specialite: { type: DataTypes.STRING },
  departement: { type: DataTypes.STRING },

  // Champs pour Administrateur
  poste: { type: DataTypes.STRING },
  niveau_access: { type: DataTypes.STRING }

}, {
  tableName: 'utilisateur',
  timestamps: false
});

module.exports = Utilisateur;

