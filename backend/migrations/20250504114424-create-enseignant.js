'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('enseignant', {
      id_enseignant: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      specialite: { type: Sequelize.STRING },
      departement: { type: Sequelize.STRING }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('enseignant');
  }
};
