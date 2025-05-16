'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questionnaire', {
      id_questionnaire: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      titre: { type: Sequelize.STRING },
      type_evaluation: { type: Sequelize.STRING },
      date_creation: { type: Sequelize.DATE }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('questionnaire');
  }
};
