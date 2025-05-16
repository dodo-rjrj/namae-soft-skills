'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      // Étudiant
      queryInterface.addColumn('utilisateur', 'promotion', { type: Sequelize.STRING }),
      queryInterface.addColumn('utilisateur', 'filiere', { type: Sequelize.STRING }),
      queryInterface.addColumn('utilisateur', 'cycle', { type: Sequelize.STRING }),

      // Enseignant
      queryInterface.addColumn('utilisateur', 'specialite', { type: Sequelize.STRING }),
      queryInterface.addColumn('utilisateur', 'departement', { type: Sequelize.STRING }),

      // Administrateur
      queryInterface.addColumn('utilisateur', 'poste', { type: Sequelize.STRING }),
      queryInterface.addColumn('utilisateur', 'niveau_access', { type: Sequelize.STRING }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeColumn('utilisateur', 'promotion'),
      queryInterface.removeColumn('utilisateur', 'filiere'),
      queryInterface.removeColumn('utilisateur', 'cycle'),

      queryInterface.removeColumn('utilisateur', 'specialite'),
      queryInterface.removeColumn('utilisateur', 'departement'),

      queryInterface.removeColumn('utilisateur', 'poste'),
      queryInterface.removeColumn('utilisateur', 'niveau_access'),
    ]);
  }
};

