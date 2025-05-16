'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projet', {
      id_projet: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nom_projet: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      date_lancement: { type: Sequelize.DATE },
      encadrant: { type: Sequelize.STRING }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('projet');
  }
};
