const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Projet = sequelize.define('Projet', {
  id_projet: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom_projet: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  date_lancement: { type: DataTypes.DATE },
  encadrant: { type: DataTypes.STRING }
}, {
  tableName: 'projet',
  timestamps: false
});

module.exports = Projet;
