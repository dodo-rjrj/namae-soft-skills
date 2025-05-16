'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ponderations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      professeurs: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pairs: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      autoEvaluation: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      professionnels: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ponderations');
  }
};
