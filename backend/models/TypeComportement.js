const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TypeComportement = sequelize.define('TypeComportement', {
  id_type: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING }
}, {
  tableName: 'type_comportement',
  timestamps: false
});

module.exports = TypeComportement;
