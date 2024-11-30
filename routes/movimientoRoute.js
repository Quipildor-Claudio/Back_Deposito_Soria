const express = require('express');
const movimientoController = require('../controllers/movimientoController');

const router = express.Router();

/**  Rutas movimiento */

router.get('/movimientos',movimientoController.getAll);
router.get('/movimiento/:id',movimientoController.getOne);
router.post('/movimiento',movimientoController.save);
router.put('/movimiento/:id',movimientoController.update);
router.delete('/movimiento/:id',movimientoController.delete);


module.exports = router;
