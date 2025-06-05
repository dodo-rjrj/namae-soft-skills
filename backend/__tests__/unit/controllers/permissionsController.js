const Permission = require('../../../models/permission');
const permissionController = require('../../../controllers/permissionsController');

jest.mock('../../../models/permission');

describe('permissionsController', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('createPermission', () => {
        beforeEach(() => {
            req.body = {
                role: 'admin',
                creerUtilisateurs: true,
                modifierUtilisateurs: true,
                supprimerUtilisateurs: true,
                creerCompetences: true,
                modifierCompetences: true,
                supprimerCompetences: true,
                voirRapports: true,
                exporterDonnees: true,
                anonymat: false
            };
        });

        it('devrait créer une nouvelle permission si le rôle n\'existe pas', async () => {
            Permission.findOne.mockResolvedValue(null);
            Permission.create.mockResolvedValue(req.body);

            await permissionController.createPermission(req, res);

            expect(Permission.findOne).toHaveBeenCalledWith({ where: { role: 'admin' } });
            expect(Permission.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(req.body);
        });

        it('devrait retourner 400 si le rôle existe déjà', async () => {
            Permission.findOne.mockResolvedValue({ role: 'admin' });

            await permissionController.createPermission(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Ce rôle existe déjà." });
        });

        it('devrait retourner 500 en cas d\'erreur', async () => {
            Permission.findOne.mockRejectedValue(new Error('DB error'));

            await permissionController.createPermission(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Erreur lors de la création",
                error: "DB error"
            });
        });
    });

    describe('getAllPermissions', () => {
        it('devrait retourner la liste des permissions', async () => {
            const mockPermissions = [
                { role: 'admin' },
                { role: 'user' }
            ];
            Permission.findAll.mockResolvedValue(mockPermissions);

            await permissionController.getAllPermissions(req, res);

            expect(res.json).toHaveBeenCalledWith(mockPermissions);
        });

        it('devrait retourner 500 en cas d\'erreur serveur', async () => {
            Permission.findAll.mockRejectedValue(new Error('DB error'));

            await permissionController.getAllPermissions(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Erreur serveur",
                error: expect.any(Error)  // l'objet Error complet
            });
        });
    });

    describe('updatePermissionByRole', () => {
        beforeEach(() => {
            req.params = { role: 'admin' };
            req.body = { creerUtilisateurs: false };
        });

        it('devrait mettre à jour la permission si le rôle existe', async () => {
            const mockPermission = {
                role: 'admin',
                creerUtilisateurs: true,
                update: jest.fn().mockResolvedValue()
            };
            Permission.findOne.mockResolvedValue(mockPermission);

            await permissionController.updatePermissionByRole(req, res);

            expect(Permission.findOne).toHaveBeenCalledWith({ where: { role: 'admin' } });
            expect(mockPermission.update).toHaveBeenCalledWith(req.body);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Permission mise à jour avec succès',
                permission: mockPermission
            });
        });

        it('devrait retourner 404 si rôle non trouvé', async () => {
            Permission.findOne.mockResolvedValue(null);

            await permissionController.updatePermissionByRole(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Rôle non trouvé' });
        });

        it('devrait retourner 500 en cas d\'erreur lors de la mise à jour', async () => {
            const mockPermission = {
                role: 'admin',
                update: jest.fn().mockRejectedValue(new Error('Update error'))
            };
            Permission.findOne.mockResolvedValue(mockPermission);

            await permissionController.updatePermissionByRole(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Erreur lors de la mise à jour',
                error: expect.any(Error)
            });
        });
    });
});
