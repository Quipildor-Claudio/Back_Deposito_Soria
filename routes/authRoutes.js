const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Rutas de autenticación
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', userController.getAll);


module.exports = router;