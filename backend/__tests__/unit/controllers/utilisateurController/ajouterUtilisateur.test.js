const { ajouterUtilisateur } = require('../../../../controllers/utilisateurController');
const Utilisateur = require('../../../../models/Utilisateur');
const bcrypt = require('bcryptjs');

jest.mock('../../../../models/Utilisateur');
jest.mock('bcryptjs');

describe('utilisateurController.ajouterUtilisateur', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
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

        bcrypt.hash.mockResolvedValue('hashedPassword');
        Utilisateur.create.mockResolvedValue({ id_utilisateur: 1, nom: 'Jean', prenom: 'Dupont' });

        await ajouterUtilisateur(req, res);

        expect(bcrypt.hash).toHaveBeenCalled();
        expect(Utilisateur.create).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Utilisateur ajouté avec succès',
            utilisateur: expect.any(Object),
            motDePasseGenere: expect.any(String)
        }));
    });

    it('retourne 500 en cas d\'erreur serveur', async () => {
        req.body = {
            nom: 'Jean',
            prenom: 'Dupont',
            email: 'jean@example.com',
            role: 'etudiant',
            promotion: '2023',
            filiere: 'Info',
            cycle: 'L3'
        };

        Utilisateur.create.mockRejectedValue(new Error('Erreur BD'));

        await ajouterUtilisateur(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur' });
    });
});
