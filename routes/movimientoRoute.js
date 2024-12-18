const express = require('express');
const movimientoController = require('../controllers/movimientoController');

const router = express.Router();

/**  Rutas movimiento */

router.get('/movimientos',movimientoController.getAllPag);
router.get('/movimiento/:id',movimientoController.getOne);
router.post('/movimiento',movimientoController.save);
router.put('/movimiento/:id',movimientoController.update);
router.delete('/movimiento/:id',movimientoController.delete);

router.get('/bydate',movimientoController.findMovementsByDateRange);
router.get('/bydateproduct',movimientoController.getMovementsByProductAndDateRange);
router.get('/bydateservice',movimientoController.getMovementsByServiceAndDateRange);



router.get('/generate-pdf/:id',movimientoController.generatePdf);

module.exports = router;
