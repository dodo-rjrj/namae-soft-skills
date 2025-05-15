const express = require('express');
const router = express.Router();
const permissionsController = require('../controllers/permissionsController');

router.post('/', permissionsController.createPermission);
router.get('/', permissionsController.getAllPermissions);
router.put('/:role', permissionsController.updatePermissionByRole);

module.exports = router;
