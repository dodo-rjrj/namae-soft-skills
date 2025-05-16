'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('entreprise', {
      id_entreprise: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nom: { type: Sequelize.STRING }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('entreprise');
  }
};
