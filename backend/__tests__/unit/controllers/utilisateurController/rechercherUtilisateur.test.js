const { rechercherUtilisateur } = require('../../../../controllers/utilisateurController');
const Utilisateur = require('../../../../models/Utilisateur');
const { Op } = require('sequelize');

jest.mock('../../../../models/Utilisateur');

describe('utilisateurController.rechercherUtilisateur', () => {
    let req, res;

    beforeEach(() => {
        req = { query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    it('retourne 400 si ni nom ni email fournis', async () => {
        req.query = {};

        await rechercherUtilisateur(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Veuillez fournir au moins un nom ou un email pour la recherche.'
        });
    });

    it('cherche par nom uniquement', async () => {
        req.query = { nom: 'Dupont' };
        const fakeUsers = [{ id_utilisateur: 1, nom: 'Dupont' }];

        Utilisateur.findAll.mockResolvedValue(fakeUsers);

        await rechercherUtilisateur(req, res);

        expect(Utilisateur.findAll).toHaveBeenCalledWith({
            where: {
                [Op.and]: [
                    { nom: { [Op.iLike]: '%Dupont%' } }
                ]
            }
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ utilisateurs: fakeUsers });
    });

    it('cherche par email uniquement', async () => {
        req.query = { email: 'test@example.com' };
        const fakeUsers = [{ id_utilisateur: 2, email: 'test@example.com' }];

        Utilisateur.findAll.mockResolvedValue(fakeUsers);

        await rechercherUtilisateur(req, res);

        expect(Utilisateur.findAll).toHaveBeenCalledWith({
            where: {
                [Op.and]: [
                    { email: { [Op.iLike]: '%test@example.com%' } }
                ]
            }
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ utilisateurs: fakeUsers });
    });

    it('cherche par nom, email et role', async () => {
        req.query = { nom: 'Dupont', email: 'dupont@example.com', role: 'admin' };
        const fakeUsers = [{ id_utilisateur: 3, nom: 'Dupont', email: 'dupont@example.com', role: 'admin' }];

        Utilisateur.findAll.mockResolvedValue(fakeUsers);

        await rechercherUtilisateur(req, res);

        expect(Utilisateur.findAll).toHaveBeenCalledWith({
            where: {
                [Op.and]: [
                    { nom: { [Op.iLike]: '%Dupont%' } },
                    { email: { [Op.iLike]: '%dupont@example.com%' } },
                    { role: 'admin' }
                ]
            }
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ utilisateurs: fakeUsers });
    });

    it('ignore role "tous"', async () => {
        req.query = { nom: 'Dupont', role: 'tous' };
        const fakeUsers = [{ id_utilisateur: 4, nom: 'Dupont', role: 'etudiant' }];

        Utilisateur.findAll.mockResolvedValue(fakeUsers);

        await rechercherUtilisateur(req, res);

        expect(Utilisateur.findAll).toHaveBeenCalledWith({
            where: {
                [Op.and]: [
                    { nom: { [Op.iLike]: '%Dupont%' } }
                ]
            }
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ utilisateurs: fakeUsers });
    });

    it('retourne 500 en cas d\'erreur serveur', async () => {
        req.query = { nom: 'Dupont' };

        Utilisateur.findAll.mockRejectedValue(new Error('Erreur DB'));

        await rechercherUtilisateur(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur.' });
    });
});
