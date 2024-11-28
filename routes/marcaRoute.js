const express = require('express');
const marcaController = require('../controllers/marcaController');

const router = express.Router();

/**  Rutas marca */

router.get('/marcas',marcaController.getAll);
router.get('/marca/:id',marcaController.getOne);
router.post('/marca',marcaController.save);
router.put('/marca/:id',marcaController.update);
router.delete('/marca/:id',marcaController.delete);


module.exports = router;
