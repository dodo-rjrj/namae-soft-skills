const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Questionnaire = sequelize.define('Questionnaire', {
  id_questionnaire: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titre: { type: DataTypes.STRING },
  type_evaluation: { type: DataTypes.STRING },
  date_creation: { type: DataTypes.DATE }
}, {
  tableName: 'questionnaire',
  timestamps: false
});

module.exports = Questionnaire;
