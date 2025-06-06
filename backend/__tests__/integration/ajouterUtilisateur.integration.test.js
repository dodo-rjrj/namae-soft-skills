const { ajouterUtilisateur } = require('../../controllers/utilisateurController');
const Utilisateur = require('../../models/Utilisateur');
const { sequelize } = require('../../models'); // pour le nettoyage

describe('utilisateurController.ajouterUtilisateur', () => {
    let req, res;

    beforeEach(async () => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Nettoyage de la base pour éviter les conflits 
        await Utilisateur.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
    });

    it('retourne 400 si nom, prenom, email ou role manquant', async () => {
        req.body = { nom: 'Jean', prenom: 'Dupont', email: '', role: 'etudiant' };

        await ajouterUtilisateur(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Les champs nom, prénom, email et rôle sont obligatoires.'
        });
    });

    it('retourne 400 si champs spécifiques manquants pour etudiant', async () => {
        req.body = {
            nom: 'Jean', prenom: 'Dupont', email: 'jean@example.com', role: 'etudiant',
            promotion: '', filiere: 'Info', cycle: 'L3'
        };

        await ajouterUtilisateur(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Les champs promotion, filière et cycle sont obligatoires pour un étudiant.'
        });
    });

    it('crée un utilisateur et retourne 201 avec mot de passe généré', async () => {
        req.body = {
            nom: 'Jean',
            prenom: 'Dupont',
            email: 'jean@example.com',
            role: 'etudiant',
            promotion: '2023',
            filiere: 'Info',
            cycle: 'L3'
        };

        await ajouterUtilisateur(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Utilisateur ajouté avec succès',
            utilisateur: expect.any(Object),
            motDePasseGenere: expect.any(String)
        }));

        const utilisateurDansLaBD = await Utilisateur.findOne({ where: { email: 'jean@example.com' } });
        expect(utilisateurDansLaBD).not.toBeNull();
    });

    it('retourne 500 en cas d\'erreur serveur (conflit email déjà utilisé)', async () => {
        // Création préalable d’un utilisateur pour forcer le conflit
        await Utilisateur.create({
            nom: 'Jean',
            prenom: 'Dupont',
            email: 'jean@example.com',
            mot_de_passe: 'dummy',
            role: 'etudiant',
            promotion: '2023',
            filiere: 'Info',
            cycle: 'L3'
        });

        req.body = {
            nom: 'Jean',
            prenom: 'Dupont',
            email: 'jean@example.com', // même email
            role: 'etudiant',
            promotion: '2023',
            filiere: 'Info',
            cycle: 'L3'
        };

        await ajouterUtilisateur(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur' });
    });

    afterAll(async () => {
        // Nettoyage et fermeture de la connexion Sequelize
        await Utilisateur.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
        await sequelize.close();
    });
});
