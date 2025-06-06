const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/auth'); // middleware d'authentification

// GET - Récupérer les paramètres utilisateur
router.get('/settings', verifyToken, userController.getSettings);

// PUT - Sauvegarder les paramètres utilisateur
router.put('/settings', verifyToken, userController.updateSettings);

// POST - Changer le mot de passe
router.post('/change-password', verifyToken, userController.changePassword);

// DELETE - Supprimer le compte
router.delete('/delete-account', verifyToken, userController.deleteAccount);

// POST - Upload d'avatar
router.post('/upload-avatar', verifyToken, userController.uploadAvatar);

module.exports = router;
