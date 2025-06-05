const Ponderation = require('../../../models/ponderation');
const ponderationController = require('../../../controllers/ponderationController');

jest.mock('../../../models/ponderation');

describe('ponderationController', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('getPonderation', () => {
        it('devrait retourner la pondération si trouvée', async () => {
            const mockPonderation = { id: 1, professeurs: 25, pairs: 25, autoEvaluation: 25, professionnels: 25 };
            Ponderation.findOne.mockResolvedValue(mockPonderation);

            await ponderationController.getPonderation(req, res);

            expect(res.json).toHaveBeenCalledWith(mockPonderation);
        });

        it('devrait retourner 404 si aucune pondération', async () => {
            Ponderation.findOne.mockResolvedValue(null);

            await ponderationController.getPonderation(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Aucune pondération trouvée." });
        });

        it('devrait retourner 500 en cas d\'erreur serveur', async () => {
            Ponderation.findOne.mockRejectedValue(new Error('DB error'));

            await ponderationController.getPonderation(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Erreur serveur',
                error: 'DB error'
            });
        });
    });

    describe('createPonderation', () => {
        beforeEach(() => {
            req.body = { professeurs: 25, pairs: 25, autoEvaluation: 25, professionnels: 25 };
        });

        it('devrait créer une nouvelle pondération si somme à 100', async () => {
            Ponderation.create.mockResolvedValue(req.body);

            await ponderationController.createPonderation(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(req.body);
        });

        it('devrait retourner 400 si somme différente de 100', async () => {
            req.body = { professeurs: 30, pairs: 30, autoEvaluation: 30, professionnels: 5 };

            await ponderationController.createPonderation(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "La somme des pondérations doit être égale à 100." });
        });

        it('devrait retourner 400 en cas d\'erreur de création', async () => {
            Ponderation.create.mockRejectedValue(new Error('Validation error'));

            await ponderationController.createPonderation(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Erreur lors de la création',
                error: 'Validation error'
            });
        });
    });

    describe('updatePonderation', () => {
        beforeEach(() => {
            req.params = { id: '1' };
            req.body = { professeurs: 25, pairs: 25, autoEvaluation: 25, professionnels: 25 };
        });

        it('devrait mettre à jour si somme à 100 et id trouvé', async () => {
            Ponderation.update.mockResolvedValue([1]);

            await ponderationController.updatePonderation(req, res);

            expect(res.json).toHaveBeenCalledWith({ message: "Pondération mise à jour." });
        });

        it('devrait retourner 400 si somme différente de 100', async () => {
            req.body = { professeurs: 30, pairs: 30, autoEvaluation: 30, professionnels: 5 };

            await ponderationController.updatePonderation(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "La somme des pondérations doit être égale à 100." });
        });

        it('devrait retourner 404 si id non trouvé', async () => {
            Ponderation.update.mockResolvedValue([0]);

            await ponderationController.updatePonderation(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Pondération non trouvée pour mise à jour." });
        });

        it('devrait retourner 400 en cas d\'erreur lors de la mise à jour', async () => {
            Ponderation.update.mockRejectedValue(new Error('Update error'));

            await ponderationController.updatePonderation(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Erreur lors de la mise à jour',
                error: 'Update error'
            });
        });
    });

});
