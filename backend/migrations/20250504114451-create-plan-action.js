'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('plan_action', {
      id_plan: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      institution: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      responsable: { type: Sequelize.STRING },
      statut: { type: Sequelize.STRING },
      date: { type: Sequelize.DATE }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('plan_action');
  }
};
