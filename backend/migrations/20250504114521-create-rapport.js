'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rapport', {
      id_rapport: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nom_rapport: { type: Sequelize.STRING },
      chemin_de_fichier: { type: Sequelize.STRING },
      resume: { type: Sequelize.STRING },
      date: { type: Sequelize.DATE },
      id_utilisateur: { type: Sequelize.INTEGER }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rapport');
  }
};
