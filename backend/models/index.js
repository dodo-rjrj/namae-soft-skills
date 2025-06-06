const sequelize = require('../config/database');
const Utilisateur = require('./Utilisateur');
const Administrateur = require('./administrateur');
const Etudiant = require('./Etudiant');
const Enseignant = require('./enseignant');
const Professionnel = require('./professionnel');
const Entreprise = require('./entreprise');
const Comportement = require('./comportement');
const PlanAction = require('./planAction');
const SessionEvaluation = require('./sessionEvaluation');
const Evaluation = require('./evaluation');
const Projet = require('./projet');
const Competence = require('./competence');
const Question = require('./question');
const Questionnaire = require('./questionnaire');
const Reponse = require('./reponse');
const Rapport = require('./rapport');
const Attestation = require('./attestation');
const TypeComportement = require('./TypeComportement');


// Associations
TypeComportement.hasMany(PlanAction, { foreignKey: 'id_type' });
PlanAction.belongsTo(TypeComportement, { foreignKey: 'id_type' });

TypeComportement.hasMany(Comportement, { foreignKey: 'id_type' });
Comportement.belongsTo(TypeComportement, { foreignKey: 'id_type' });

PlanAction.hasMany(Comportement, { foreignKey: 'id_plan' });
Comportement.belongsTo(PlanAction, { foreignKey: 'id_plan' });

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
  TypeComportement,
  Attestation
};


