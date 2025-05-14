const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comportement = sequelize.define('Comportement', {
  id_comportement: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING },
  solution: { type: DataTypes.STRING },
  date_signalement: { type: DataTypes.DATE },
  statut: { type: DataTypes.STRING }
}, {
  tableName: 'comportement',
  timestamps: false
});

module.exports = Comportement;
