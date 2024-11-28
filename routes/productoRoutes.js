const express = require('express');
const productoController = require('../controllers/productoController');

const router = express.Router();

/**  Rutas producto */

router.get('/productos',productoController.getAll);
router.get('/producto/:id',productoController.getOne);
router.post('/producto',productoController.save);
router.put('/producto/:id',productoController.update);
router.delete('/producto/:id',productoController.delete);


module.exports = router;
