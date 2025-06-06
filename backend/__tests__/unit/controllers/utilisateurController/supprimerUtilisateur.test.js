const { supprimerUtilisateur } = require('../../../../controllers/utilisateurController');
const Utilisateur = require('../../../../models/Utilisateur');

jest.mock('../../../../models/Utilisateur');

describe('utilisateurController.supprimerUtilisateur', () => {
    let req, res;

    beforeEach(() => {
        req = { params: { id: '1' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    it('retourne 404 si utilisateur non trouvé', async () => {
        Utilisateur.findByPk.mockResolvedValue(null);

        await supprimerUtilisateur(req, res);

        expect(Utilisateur.findByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Utilisateur non trouvé.' });
    });

    it('supprime l\'utilisateur et retourne 200', async () => {
        const mockUtilisateur = {
            destroy: jest.fn().mockResolvedValue()
        };
        Utilisateur.findByPk.mockResolvedValue(mockUtilisateur);

        await supprimerUtilisateur(req, res);

        expect(Utilisateur.findByPk).toHaveBeenCalledWith('1');
        expect(mockUtilisateur.destroy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur supprimé avec succès.' });
    });

    it('retourne 500 en cas d\'erreur serveur', async () => {
        Utilisateur.findByPk.mockRejectedValue(new Error('Erreur base de données'));

        await supprimerUtilisateur(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur.' });
    });
});
