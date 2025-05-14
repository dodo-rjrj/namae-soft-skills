'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('question', {
      id_question: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      libelle: { type: Sequelize.STRING },
      type_question: { type: Sequelize.STRING },
      id_questionnaire: { type: Sequelize.INTEGER }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('question');
  }
};
