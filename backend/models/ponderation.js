const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ponderation = sequelize.define('Ponderation', {
  professeurs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pairs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  autoEvaluation: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  professionnels: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Ponderations',
  timestamps: true,
});

module.exports = Ponderation;
