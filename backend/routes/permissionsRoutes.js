const express = require('express');
const router = express.Router();
const permissionsController = require('../controllers/permissionsController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.post('/', authenticate, authorize('administrateur'), permissionsController.createPermission);
router.get('/', authenticate, authorize('administrateur'), permissionsController.getAllPermissions);
router.put('/:role', authenticate, authorize('administrateur'), permissionsController.updatePermissionByRole);

module.exports = router;
