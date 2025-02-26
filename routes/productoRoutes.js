const express = require('express');
const productoController = require('../controllers/productoController');

const router = express.Router();

/**  Rutas producto */

router.get('/productos',productoController.getAllPag);
router.get('/producto/:id',productoController.getOne);
router.post('/producto',productoController.save);
router.put('/producto/:id',productoController.update);
router.delete('/producto/:id',productoController.delete);

router.get('/searchnom',productoController.getProductoByName);
router.get('/searchid',productoController.getProductoById);
router.post('/actualizar-stock',productoController.actulizarCant);

router.get('/searchpcode/:code',productoController.getProductoByCode);

router.get('/modificados-sin-stock', productoController.obtenerProductosModificadosSinStock);
router.get('/stock', productoController.getProductosConStock); // Endpoint para obtener productos con stock


module.exports = router;
