'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('evaluation', {
      id_evaluation: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      type_evaluation: { type: Sequelize.STRING },
      note: { type: Sequelize.FLOAT },
      commentaire: { type: Sequelize.STRING },
      date: { type: Sequelize.DATE },
      statut: { type: Sequelize.STRING },
      id_utilisateur: { type: Sequelize.INTEGER },
      id_session: { type: Sequelize.INTEGER },
      id_projet: { type: Sequelize.INTEGER },
      id_competence: { type: Sequelize.INTEGER }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('evaluation');
  }
};
