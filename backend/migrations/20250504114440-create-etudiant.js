'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('etudiant', {
      id_etudiant: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      promotion: { type: Sequelize.STRING },
      filiere: { type: Sequelize.STRING },
      cycle: { type: Sequelize.STRING }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('etudiant');
  }
};
