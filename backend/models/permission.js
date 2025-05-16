const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Permission = sequelize.define('Permission', {
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  creerUtilisateurs: DataTypes.BOOLEAN,
  modifierUtilisateurs: DataTypes.BOOLEAN,
  supprimerUtilisateurs: DataTypes.BOOLEAN,
  creerCompetences: DataTypes.BOOLEAN,
  modifierCompetences: DataTypes.BOOLEAN,
  supprimerCompetences: DataTypes.BOOLEAN,
  voirRapports: DataTypes.BOOLEAN,
  exporterDonnees: DataTypes.BOOLEAN,
  anonymat: DataTypes.BOOLEAN
}, {
  tableName: 'Permissions',  // vérifie bien le nom de ta table en BDD
  timestamps: false
});

module.exports = Permission;
