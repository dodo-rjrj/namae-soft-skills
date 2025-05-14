const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Administrateur = sequelize.define('Administrateur', {
  id_administrateur: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  poste: { type: DataTypes.STRING },
  niveau_access: { type: DataTypes.STRING }
}, {
  tableName: 'administrateur',
  timestamps: false
});

module.exports = Administrateur;
