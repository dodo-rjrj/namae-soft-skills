'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('session_evaluation', {
      id_session: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      libelle_session: { type: Sequelize.STRING },
      date_debut: { type: Sequelize.DATE },
      date_fin: { type: Sequelize.DATE },
      type_session: { type: Sequelize.STRING }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('session_evaluation');
  }
};

