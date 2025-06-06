const autoriserRoles = require('../../../middlewares/authorize');

describe('Middleware de contrôle des rôles', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('retourne 403 si req.utilisateur est absent', () => {
        const middleware = autoriserRoles('admin');
        middleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: 'Accès interdit : rôle insuffisant.' });
    });

    it('retourne 403 si rôle non autorisé', () => {
        req.utilisateur = { role: 'etudiant' };
        const middleware = autoriserRoles('admin');
        middleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: 'Accès interdit : rôle insuffisant.' });
    });

    it('appelle next() si rôle autorisé', () => {
        req.utilisateur = { role: 'admin' };
        const middleware = autoriserRoles('admin', 'moderateur');
        middleware(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});
