const express = require('express');
const roleController = require('../controllers/roleController');

const router = express.Router();

// Rutas de autenticación
router.get('/roles',roleController.getAll);
router.get('/role/:id',roleController.getOne);
router.post('/role',roleController.save);
router.put('/role/:id',roleController.update);
router.delete('/role/:id',roleController.delete);


module.exports = router;
