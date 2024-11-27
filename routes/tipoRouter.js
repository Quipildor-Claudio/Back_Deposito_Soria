const express = require('express');
const tipoController = require('../controllers/tipoController');

const router = express.Router();

/**  Rutas tipo */

router.get('/tipos',tipoController.getAll);
router.get('/tipo/:id',tipoController.getOne);
router.post('/tipo',tipoController.save);
router.put('/tipo/:id',tipoController.update);
router.delete('/tipo/:id',tipoController.delete);


module.exports = router;
