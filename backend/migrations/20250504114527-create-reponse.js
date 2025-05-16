'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reponse', {
      id_reponse: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      valeur_reponse: { type: Sequelize.STRING },
      id_question: { type: Sequelize.INTEGER }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reponse');
  }
};
