const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlanAction = sequelize.define('PlanAction', {
  id_plan: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  institution: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  responsable: { type: DataTypes.STRING },
  statut: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE }
}, {
  tableName: 'plan_action',
  timestamps: false
});

module.exports = PlanAction;
