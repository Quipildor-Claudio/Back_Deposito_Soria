const express = require('express');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

/**  Rutas Service */

router.get('/services',serviceController.getAll);
router.get('/service/:id',serviceController.getOne);
router.post('/service',serviceController.save);
router.put('/service/:id',serviceController.update);
router.delete('/service/:id',serviceController.delete);


module.exports = router;
