const Competence = require('../../../models/competence');
const competenceController = require('../../../controllers/competenceController');

jest.mock('../../../models/competence');

describe('competenceController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ajouterCompetence', () => {
    it('doit ajouter une compétence avec succès', async () => {
      const req = { body: { nom: 'JS', description: 'JavaScript' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Competence.create.mockResolvedValue(req.body);

      await competenceController.ajouterCompetence(req, res);

      expect(Competence.create).toHaveBeenCalledWith({
        nom: 'JS',
        description: 'JavaScript'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Compétence ajoutée avec succès',
        competence: req.body
      }));
    });

    it('doit retourner une erreur si nom est manquant', async () => {
      const req = { body: { description: 'desc' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await competenceController.ajouterCompetence(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Le champ "nom" est obligatoire.' });
      expect(Competence.create).not.toHaveBeenCalled();
    });

    it('doit gérer une erreur serveur', async () => {
      const req = { body: { nom: 'JS', description: 'JavaScript' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Competence.create.mockRejectedValue(new Error('fail'));

      await competenceController.ajouterCompetence(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur' });
    });
  });

  describe('modifierCompetence', () => {
    it('doit modifier une compétence existante', async () => {
      const fakeCompetence = {
        nom: 'Old',
        description: 'Ancienne desc',
        save: jest.fn().mockResolvedValue(true)
      };
      const req = {
        params: { id_competence: '1' },
        body: { nom: 'Updated', description: 'Nouvelle desc' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Competence.findByPk.mockResolvedValue(fakeCompetence);

      await competenceController.modifierCompetence(req, res);

      expect(fakeCompetence.nom).toBe('Updated');
      expect(fakeCompetence.description).toBe('Nouvelle desc');
      expect(fakeCompetence.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Compétence mise à jour avec succès',
        competence: fakeCompetence
      }));
    });

    it('doit retourner 404 si la compétence n\'existe pas', async () => {
      const req = { params: { id_competence: '99' }, body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Competence.findByPk.mockResolvedValue(null);

      await competenceController.modifierCompetence(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Compétence non trouvée' });
    });

    it('doit gérer une erreur serveur', async () => {
      const req = { params: { id_competence: '1' }, body: { nom: 'fail' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Competence.findByPk.mockRejectedValue(new Error('fail'));

      await competenceController.modifierCompetence(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur' });
    });
  });

  describe('supprimerCompetence', () => {
    it('doit supprimer une compétence existante', async () => {
      const fakeCompetence = {
        destroy: jest.fn().mockResolvedValue(true)
      };
      const req = { params: { id_competence: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Competence.findByPk.mockResolvedValue(fakeCompetence);

      await competenceController.supprimerCompetence(req, res);

      expect(fakeCompetence.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Compétence supprimée avec succès',
      });
    });

    it('doit retourner 404 si la compétence n\'existe pas', async () => {
      const req = { params: { id_competence: '99' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Competence.findByPk.mockResolvedValue(null);

      await competenceController.supprimerCompetence(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Compétence non trouvée' });
    });

    it('doit gérer une erreur serveur', async () => {
      const req = { params: { id_competence: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Competence.findByPk.mockRejectedValue(new Error('fail'));

      await competenceController.supprimerCompetence(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur' });
    });
  });

  describe('rechercherCompetence', () => {
    it('doit retourner une liste de compétences correspondantes', async () => {
      const fakeResults = [
        { nom: 'JS', description: 'JavaScript' },
        { nom: 'TS', description: 'TypeScript' }
      ];
      const req = { query: { search: 'JS' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Competence.findAll.mockResolvedValue(fakeResults);

      await competenceController.rechercherCompetence(req, res);

      expect(Competence.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeResults);
    });

    it('doit retourner 404 si aucun résultat', async () => {
      const req = { query: { search: 'aucun' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Competence.findAll.mockResolvedValue([]);

      await competenceController.rechercherCompetence(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Aucune compétence trouvée.' });
    });

    it('doit gérer une erreur serveur', async () => {
      const req = { query: { search: 'fail' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Competence.findAll.mockRejectedValue(new Error('fail'));

      await competenceController.rechercherCompetence(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erreur serveur.' });
    });
  });
});
