'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Supprimer 'solution' seulement si elle existe
    const table = await queryInterface.describeTable('comportement');

    if (table.solution) {
      await queryInterface.removeColumn('comportement', 'solution');
    }

    if (!table.id_type) {
      await queryInterface.addColumn('comportement', 'id_type', {
        type: Sequelize.INTEGER,
        references: {
          model: 'type_comportement',
          key: 'id_type'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }

    if (!table.id_plan) {
      await queryInterface.addColumn('comportement', 'id_plan', {
        type: Sequelize.INTEGER,
        references: {
          model: 'plan_action',
          key: 'id_plan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('comportement', 'id_type');
    await queryInterface.removeColumn('comportement', 'id_plan');

    await queryInterface.addColumn('comportement', 'solution', {
      type: Sequelize.STRING
    });
  }
};
