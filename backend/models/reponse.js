const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reponse = sequelize.define('Reponse', {
  id_reponse: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  valeur_reponse: { type: DataTypes.STRING }
}, {
  tableName: 'reponse',
  timestamps: false
});

module.exports = Reponse;
