const sequelize = require('../config/database');
const Utilisateur = require('./Utilisateur');
const Administrateur = require('./Administrateur');
const Etudiant = require('./Etudiant');
const Enseignant = require('./Enseignant');
const Professionnel = require('./Professionnel');
const Entreprise = require('./Entreprise');
const Comportement = require('./Comportement');
const PlanAction = require('./PlanAction');
const SessionEvaluation = require('./SessionEvaluation');
const Evaluation = require('./Evaluation');
const Projet = require('./Projet');
const Competence = require('./Competence');
const Question = require('./Question');
const Questionnaire = require('./Questionnaire');
const Reponse = require('./Reponse');
const Rapport = require('./Rapport');
const Attestation = require('./Attestation');

// Associations

// Utilisateur -> Evaluation (en tant qu'évaluateur)
Utilisateur.hasMany(Evaluation, { foreignKey: 'id_utilisateur' });
Evaluation.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });

// SessionEvaluation -> Evaluation
SessionEvaluation.hasMany(Evaluation, { foreignKey: 'id_session' });
Evaluation.belongsTo(Competence, { foreignKey: 'id_competence', as: 'competence' });
Competence.hasMany(Evaluation, { foreignKey: 'id_competence', as: 'evaluations' });

Evaluation.belongsTo(SessionEvaluation, { foreignKey: 'id_session' });

// Projet -> Evaluation
Projet.hasMany(Evaluation, { foreignKey: 'id_projet' });
Evaluation.belongsTo(Projet, { foreignKey: 'id_projet' });

// Evaluation -> Competence
Evaluation.belongsTo(Competence, { foreignKey: 'id_competence' });

// Questionnaire -> Question
Questionnaire.hasMany(Question, { foreignKey: 'id_questionnaire' });
Question.belongsTo(Questionnaire, { foreignKey: 'id_questionnaire' });

// Question -> Reponse
Question.hasMany(Reponse, { foreignKey: 'id_question' });
Reponse.belongsTo(Question, { foreignKey: 'id_question' });

// Reponse -> Evaluation (par id_evaluation si besoin plus tard)

// Administrateur gère Comportement
Administrateur.hasMany(Comportement, { foreignKey: 'id_administrateur' });
Comportement.belongsTo(Administrateur, { foreignKey: 'id_administrateur' });

// Comportement lié à Etudiant
Etudiant.hasMany(Comportement, { foreignKey: 'id_etudiant' });
Comportement.belongsTo(Etudiant, { foreignKey: 'id_etudiant' });

// PlanAction lié à Comportement
PlanAction.hasMany(Comportement, { foreignKey: 'id_plan' });
Comportement.belongsTo(PlanAction, { foreignKey: 'id_plan' });

// Utilisateur génère Rapport
Utilisateur.hasMany(Rapport, { foreignKey: 'id_utilisateur' });
Rapport.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });

// Validation compétence -> Attestation
Competence.hasMany(Attestation, { foreignKey: 'id_competence' });
Attestation.belongsTo(Competence, { foreignKey: 'id_competence' });

// Export
module.exports = {
  sequelize,
  Utilisateur,
  Administrateur,
  Etudiant,
  Enseignant,
  Professionnel,
  Entreprise,
  Comportement,
  PlanAction,
  SessionEvaluation,
  Evaluation,
  Projet,
  Competence,
  Question,
  Questionnaire,
  Reponse,
  Rapport,
  Attestation
};


