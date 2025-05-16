const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Evaluation = sequelize.define('Evaluation', {
  id_evaluation: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type_evaluation: { type: DataTypes.STRING },
  note: { type: DataTypes.FLOAT },
  commentaire: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  statut: { type: DataTypes.STRING }
}, {
  tableName: 'evaluation',
  timestamps: false
});

module.exports = Evaluation;