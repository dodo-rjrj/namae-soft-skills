'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comportement', {
      id_comportement: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      description: { type: Sequelize.STRING },
      solution: { type: Sequelize.STRING },
      date_signalement: { type: Sequelize.DATE },
      statut: { type: Sequelize.STRING },
      id_administrateur: { type: Sequelize.INTEGER },
      id_etudiant: { type: Sequelize.INTEGER },
      id_plan: { type: Sequelize.INTEGER }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comportement');
  }
};
