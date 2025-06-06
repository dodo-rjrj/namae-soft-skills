const authMiddleware = require('../../../middlewares/authenticate');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('Middleware d\'authentification JWT', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('retourne 401 si aucun header', () => {
        authMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Token manquant ou mal formé.' });
    });

    it('retourne 401 si header mal formé', () => {
        req.headers.authorization = 'Token abcdef';
        authMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Token manquant ou mal formé.' });
    });

    it('retourne 401 si token invalide', () => {
        req.headers.authorization = 'Bearer invalidtoken';
        jwt.verify.mockImplementation(() => { throw new Error('invalid token'); });

        authMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Token invalide ou expiré.' });
    });

    it('passe à next() si token valide', () => {
        const fakeDecoded = { id: 1, role: 'admin' };
        req.headers.authorization = 'Bearer validtoken';
        jwt.verify.mockReturnValue(fakeDecoded);

        authMiddleware(req, res, next);
        expect(req.utilisateur).toEqual(fakeDecoded);
        expect(next).toHaveBeenCalled();
    });
});
