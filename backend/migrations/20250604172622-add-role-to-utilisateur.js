'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('utilisateur', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'etudiant' // tu peux changer ça si besoin
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('utilisateur', 'role');
  }
};
