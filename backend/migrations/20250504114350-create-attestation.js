'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attestation', {
      id_badge: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      competence: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      niveau: { type: Sequelize.STRING },
      lien: { type: Sequelize.STRING },
      lien_linkedin: { type: Sequelize.STRING }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attestation');
  }
};
