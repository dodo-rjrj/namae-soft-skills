const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const Utilisateur = require('../models/Utilisateur');


describe('Utilisateur CRUD', () => {
    let utilisateurCree = null;

    test('Créer un utilisateur étudiant', async () => {
        const res = await request(app)
            .post('/api/utilisateurs/ajouter')
            .send({
                nom: 'ny',
                prenom: 'hasina',
                email: 'ny@example.com',
                role: 'etudiant',
                promotion: '2025',
                filiere: 'Informatique',
                cycle: 'Ingenieur'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.utilisateur).toHaveProperty('id_utilisateur');
        utilisateurCree = res.body.utilisateur;
    });

    test('Créer un utilisateur enseignant', async () => {
        const res = await request(app)
            .post('/api/utilisateurs/ajouter')
            .send({
                nom: 'Martin',
                prenom: 'Sophie',
                email: 'sophie.martin@example.com',
                role: 'enseignant',
                specialite: 'Mathématiques',
                departement: 'Sciences'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.utilisateur).toHaveProperty('id_utilisateur');
    });

    test('Mettre à jour un utilisateur', async () => {
        expect(utilisateurCree).not.toBeNull();

        const res = await request(app)
            .patch(`/api/utilisateurs/modifier/${utilisateurCree.id_utilisateur}`)
            .send({ filiere: 'cybersecurite' });

        expect(res.statusCode).toBe(200);
        expect(res.body.utilisateur.filiere).toBe('cybersecurite');
    });

    test('Rejet si champs obligatoires manquants', async () => {
        const res = await request(app)
            .post('/api/utilisateurs/ajouter')
            .send({
                prenom: 'Paul',
                email: 'paul@example.com',
                role: 'etudiant',
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    test('Rejet si champs spécifiques étudiant manquants', async () => {
        const res = await request(app)
            .post('/api/utilisateurs/ajouter')
            .send({
                nom: 'Durand',
                prenom: 'Paul',
                email: 'paul.durand@example.com',
                role: 'etudiant',
                // promotion, filiere, cycle manquants
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    test('Rejet si champs spécifiques enseignant manquants', async () => {
        const res = await request(app)
            .post('/api/utilisateurs/ajouter')
            .send({
                nom: 'Dupuis',
                prenom: 'Claire',
                email: 'claire.dupuis@example.com',
                role: 'enseignant',
                // specialite, departement manquants
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});