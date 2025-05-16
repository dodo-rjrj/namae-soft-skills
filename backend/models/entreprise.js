const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Entreprise = sequelize.define('Entreprise', {
  id_entreprise: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING }
}, {
  tableName: 'entreprise',
  timestamps: false
});

module.exports = Entreprise;
