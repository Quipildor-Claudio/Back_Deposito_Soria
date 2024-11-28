const express = require('express');
const unidadMedidaController = require('../controllers/unidadMedidaController');

const router = express.Router();

/**  Rutas unidadMedida */

router.get('/unidadMedidas',unidadMedidaController.getAll);
router.get('/unidadMedida/:id',unidadMedidaController.getOne);
router.post('/unidadMedida',unidadMedidaController.save);
router.put('/unidadMedida/:id',unidadMedidaController.update);
router.delete('/unidadMedida/:id',unidadMedidaController.delete);


module.exports = router;
