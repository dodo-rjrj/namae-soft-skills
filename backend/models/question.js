const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Question = sequelize.define('Question', {
  id_question: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  libelle: { type: DataTypes.STRING },
  type_question: { type: DataTypes.STRING }
}, {
  tableName: 'question',
  timestamps: false
});

module.exports = Question;
