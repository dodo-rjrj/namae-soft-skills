const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attestation = sequelize.define('Attestation', {
  id_badge: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  competence: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  niveau: { type: DataTypes.STRING },
  lien: { type: DataTypes.STRING },
  lien_linkedin: { type: DataTypes.STRING }
}, {
  tableName: 'attestation',
  timestamps: false
});

module.exports = Attestation;
