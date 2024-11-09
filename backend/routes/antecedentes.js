// routes/antecedentes.js
const express = require('express');
const router = express.Router();
const antecedentesController = require('../controllers/antecedentesController');
const verifyToken = require('../middlewares/auth');

router.post('/crear', verifyToken, antecedentesController.crearAntecedentes);
router.get('/:noBoleta', verifyToken, antecedentesController.obtenerAntecedentes);
router.patch('/:noBoleta', verifyToken, antecedentesController.actualizarAntecedentes);
router.delete('/:noBoleta', verifyToken, antecedentesController.eliminarAntecedentes);

module.exports = router;

