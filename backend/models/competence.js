const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Competence = sequelize.define('Competence', {
  id_competence: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING }
}, {
  tableName: 'competence',
  timestamps: false
});

module.exports = Competence;
