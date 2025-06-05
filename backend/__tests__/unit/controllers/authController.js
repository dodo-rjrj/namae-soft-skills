const { login } = require('../../../controllers/authController');
const Utilisateur = require('../../../models/Utilisateur');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../../../models/Utilisateur');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('authController.login', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                motDePasse: 'motdepasse'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('retourne 401 si utilisateur non trouvé', async () => {
        Utilisateur.findOne.mockResolvedValue(null);

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Utilisateur non trouvé.' });
    });

    it('retourne 401 si mot de passe invalide', async () => {
        Utilisateur.findOne.mockResolvedValue({
            mot_de_passe: 'hashedpassword'
        });

        bcrypt.compare.mockResolvedValue(false);

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Mot de passe incorrect.' });
    });

    it('retourne 200 avec token si connexion réussie', async () => {
        const fakeUser = {
            id_utilisateur: 1,
            nom: 'Dupont',
            prenom: 'Jean',
            email: 'test@example.com',
            role: 'admin',
            mot_de_passe: 'hashed'
        };

        Utilisateur.findOne.mockResolvedValue(fakeUser);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('fake-jwt-token');

        await login(req, res);

        expect(jwt.sign).toHaveBeenCalledWith(
            { id: fakeUser.id_utilisateur, role: fakeUser.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Connexion réussie.',
            token: 'fake-jwt-token',
            utilisateur: {
                id: fakeUser.id_utilisateur,
                nom: fakeUser.nom,
                prenom: fakeUser.prenom,
                email: fakeUser.email,
                role: fakeUser.role
            }
        });
    });

    it('retourne 500 en cas d\'erreur serveur', async () => {
        Utilisateur.findOne.mockRejectedValue(new Error('Erreur BD'));

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur' });
    });
});
