const express = require('express');
const comprobanteController = require('../controllers/comprobanteController');

const router = express.Router();

/**  Rutas comprobante */

router.get('/comprobantes',comprobanteController.getAll);
router.get('/comprobante/:id',comprobanteController.getOne);
router.post('/comprobante',comprobanteController.save);
router.put('/comprobante/:id',comprobanteController.update);
router.delete('/comprobante/:id',comprobanteController.delete);


module.exports = router;
