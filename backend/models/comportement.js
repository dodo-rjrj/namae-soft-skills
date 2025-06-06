const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comportement = sequelize.define('Comportement', {
  id_comportement: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING },
  date_signalement: { type: DataTypes.DATE },
  statut: { type: DataTypes.STRING },
    id_type: {
    type: DataTypes.INTEGER,
    references: { model: 'type_comportement', key: 'id_type' }
  },
  id_plan: {
    type: DataTypes.INTEGER,
    references: { model: 'plan_action', key: 'id_plan' }
  }
}, {
  tableName: 'comportement',
  timestamps: false
});

module.exports = Comportement;
