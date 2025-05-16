'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('professionnel', {
      id_professionnel: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('professionnel');
  }
};
