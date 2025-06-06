'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('plan_action', 'id_type', {
      type: Sequelize.INTEGER,
      references: {
        model: 'type_comportement',
        key: 'id_type'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('plan_action', 'id_type');
  }
};
