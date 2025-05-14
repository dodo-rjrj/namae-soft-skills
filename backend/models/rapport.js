const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rapport = sequelize.define('Rapport', {
  id_rapport: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom_rapport: { type: DataTypes.STRING },
  chemin_de_fichier: { type: DataTypes.STRING },
  resume: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE }
}, {
  tableName: 'rapport',
  timestamps: false
});

module.exports = Rapport;
