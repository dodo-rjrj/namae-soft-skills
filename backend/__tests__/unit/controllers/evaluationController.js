const { Evaluation, Competence, sequelize } = require('../../../models');
const evaluationController = require('../../../controllers/evaluationController');

jest.mock('../../../models', () => ({
    Evaluation: {
        count: jest.fn(),
        findAll: jest.fn()
    },
    Competence: jest.fn(),
    sequelize: {
        fn: jest.fn(),
        col: jest.fn(),
        literal: jest.fn()
    }
}));

describe('evaluationController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            query: {},
            body: {},
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('getTotalEvaluations', () => {
        it('doit retourner le total des évaluations', async () => {
            Evaluation.count.mockResolvedValue(42);

            await evaluationController.getTotalEvaluations(req, res);

            expect(Evaluation.count).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ totalEvaluations: 42 });
        });

        it('doit gérer une erreur', async () => {
            Evaluation.count.mockRejectedValue(new Error('DB error'));

            await evaluationController.getTotalEvaluations(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Erreur serveur' });
        });
    });

    describe('getMoyenneGlobale', () => {
        it('doit retourner la moyenne des notes', async () => {
            const mockResult = [{ get: () => '3.75' }];
            Evaluation.findAll.mockResolvedValue(mockResult);

            await evaluationController.getMoyenneGlobale(req, res);

            expect(Evaluation.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ moyenne: '3.75' });
        });

        it('doit retourner null si aucune donnée', async () => {
            Evaluation.findAll.mockResolvedValue([]);

            await evaluationController.getMoyenneGlobale(req, res);

            expect(res.json).toHaveBeenCalledWith({ moyenne: null });
        });

        it('doit gérer une erreur', async () => {
            Evaluation.findAll.mockRejectedValue(new Error('DB error'));

            await evaluationController.getMoyenneGlobale(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur' });
        });
    });

    describe('getMoyenneParCompetence', () => {
        it('doit retourner les moyennes par compétence', async () => {
            const mockData = [
                {
                    competence: { nom: 'Comp A' },
                    get: () => '4.00'
                },
                {
                    competence: { nom: 'Comp B' },
                    get: () => '3.50'
                }
            ];

            Evaluation.findAll.mockResolvedValue(mockData);

            await evaluationController.getMoyenneParCompetence(req, res);

            expect(Evaluation.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith([
                { competence: 'Comp A', moyenne: '4.00' },
                { competence: 'Comp B', moyenne: '3.50' }
            ]);
        });

        it('doit gérer une erreur', async () => {
            Evaluation.findAll.mockRejectedValue(new Error('DB error'));

            await evaluationController.getMoyenneParCompetence(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur' });
        });
    });

    describe('getEvaluationsParJour', () => {
        it('doit retourner les évaluations par jour', async () => {
            const mockData = [
                { dataValues: { jour: 'Mon', ordre: 1, nombre: 5 } },
                { dataValues: { jour: 'Tue', ordre: 2, nombre: 3 } }
            ];
            Evaluation.findAll.mockResolvedValue(mockData);

            await evaluationController.getEvaluationsParJour(req, res);

            expect(Evaluation.findAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData);
        });

        it('doit gérer une erreur', async () => {
            Evaluation.findAll.mockRejectedValue(new Error('DB error'));

            await evaluationController.getEvaluationsParJour(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Erreur serveur' });
        });
    });

    describe('getEvaluationsParMois', () => {
        it('doit retourner les évaluations par mois', async () => {
            const mockData = [
                { dataValues: { mois: 'Jan', ordre: 1, nombre: 10 } },
                { dataValues: { mois: 'Feb', ordre: 2, nombre: 8 } }
            ];
            Evaluation.findAll.mockResolvedValue(mockData);

            await evaluationController.getEvaluationsParMois(req, res);

            expect(Evaluation.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockData);
        });

        it('doit gérer une erreur', async () => {
            Evaluation.findAll.mockRejectedValue(new Error('DB error'));

            await evaluationController.getEvaluationsParMois(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur' });
        });
    });

    describe('getStatsFiltrées', () => {
        it('appelle getEvaluationsParJour pour filtre semaine', async () => {
            req.query.filtre = 'semaine';
            const spy = jest.spyOn(evaluationController, 'getEvaluationsParJour').mockImplementation(async (req, res) => {
                res.status(200).json({ called: true });
            });

            await evaluationController.getStatsFiltrées(req, res);

            expect(spy).toHaveBeenCalledWith(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ called: true });

            spy.mockRestore();
        });

        it('appelle getEvaluationsParMois pour filtre mois', async () => {
            req.query.filtre = 'mois';
            const spy = jest.spyOn(evaluationController, 'getEvaluationsParMois').mockImplementation(async (req, res) => {
                res.status(200).json({ called: true });
            });

            await evaluationController.getStatsFiltrées(req, res);

            expect(spy).toHaveBeenCalledWith(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ called: true });

            spy.mockRestore();
        });

        it('retourne 400 si filtre invalide', async () => {
            req.query.filtre = 'année';

            await evaluationController.getStatsFiltrées(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Filtre invalide. Utilisez 'semaine' ou 'mois'." });
        });
    });
});
