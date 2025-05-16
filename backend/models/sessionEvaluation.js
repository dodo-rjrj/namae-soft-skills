const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SessionEvaluation = sequelize.define('SessionEvaluation', {
  id_session: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  libelle_session: { type: DataTypes.STRING },
  date_debut: { type: DataTypes.DATE },
  date_fin: { type: DataTypes.DATE },
  type_session: { type: DataTypes.STRING }
}, {
  tableName: 'session_evaluation',
  timestamps: false
});

module.exports = SessionEvaluation;
