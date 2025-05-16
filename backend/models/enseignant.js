const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enseignant = sequelize.define('Enseignant', {
  id_enseignant: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  specialite: { type: DataTypes.STRING },
  departement: { type: DataTypes.STRING }
}, {
  tableName: 'enseignant',
  timestamps: false
});

module.exports = Enseignant;
