const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Etudiant = sequelize.define('Etudiant', {
  id_etudiant: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  promotion: { type: DataTypes.STRING },
  filiere: { type: DataTypes.STRING },
  cycle: { type: DataTypes.STRING }
}, {
  tableName: 'etudiant',
  timestamps: false
});

module.exports = Etudiant;
