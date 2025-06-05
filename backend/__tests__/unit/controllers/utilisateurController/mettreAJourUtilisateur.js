const { mettreAJourUtilisateur } = require('../../../../controllers/utilisateurController');
const Utilisateur = require('../../../../models/Utilisateur');

jest.mock('../../../../models/Utilisateur');

describe('mettreAJourUtilisateur', () => {
    let req, res, utilisateurMock;

    beforeEach(() => {
        req = {
            params: { id: '1' },
            body: { nom: 'NouveauNom', email: 'nouveau@mail.com' }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        utilisateurMock = {
            id_utilisateur: 1,
            nom: 'AncienNom',
            email: 'ancien@mail.com',
            save: jest.fn()
        };
    });

    it('retourne 404 si utilisateur non trouvé', async () => {
        Utilisateur.findOne.mockResolvedValue(null);

        await mettreAJourUtilisateur(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Utilisateur non trouvé.' });
    });

    it('met à jour l\'utilisateur et retourne 200', async () => {
        Utilisateur.findOne.mockResolvedValue(utilisateurMock);
        utilisateurMock.save.mockResolvedValue();

        await mettreAJourUtilisateur(req, res);

        // Vérifier que les propriétés ont été mises à jour
        expect(utilisateurMock.nom).toBe('NouveauNom');
        expect(utilisateurMock.email).toBe('nouveau@mail.com');

        expect(utilisateurMock.save).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Utilisateur mis à jour avec succès',
            utilisateur: utilisateurMock
        });
    });

    it('retourne 500 en cas d\'erreur serveur', async () => {
        Utilisateur.findOne.mockRejectedValue(new Error('Erreur base de données'));

        await mettreAJourUtilisateur(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur' });
    });
});
