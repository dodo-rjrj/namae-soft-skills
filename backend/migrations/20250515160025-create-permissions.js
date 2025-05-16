'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      creerUtilisateurs: Sequelize.BOOLEAN,
      modifierUtilisateurs: Sequelize.BOOLEAN,
      supprimerUtilisateurs: Sequelize.BOOLEAN,
      creerCompetences: Sequelize.BOOLEAN,
      modifierCompetences: Sequelize.BOOLEAN,
      supprimerCompetences: Sequelize.BOOLEAN,
      voirRapports: Sequelize.BOOLEAN,
      exporterDonnees: Sequelize.BOOLEAN,
      anonymat: Sequelize.BOOLEAN,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Permissions');
  }
};
