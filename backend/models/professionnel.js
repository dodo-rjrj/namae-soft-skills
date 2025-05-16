const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Professionnel = sequelize.define('Professionnel', {
  id_professionnel: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}, {
  tableName: 'professionnel',
  timestamps: false
});

module.exports = Professionnel;
