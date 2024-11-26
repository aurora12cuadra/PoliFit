// routes/citas.js
const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const verifyToken = require('../middlewares/auth');

router.post('/register', verifyToken, citaController.registrarCita);
router.get('/', verifyToken, citaController.obtenerCitas);
router.get('/:id', verifyToken, citaController.obtenerCitaPorId);
router.patch('/:id', verifyToken, citaController.actualizarCita);
router.delete('/:id', verifyToken, citaController.eliminarCita);
router.get('/fecha/:fecha', verifyToken, citaController.obtenerCitasPorFecha);
router.get('/paciente/:noBoleta', verifyToken, citaController.obtenerCitasPorPaciente);
router.get('/rango', verifyToken, citaController.obtenerCitasPorRangoFechas);

module.exports = router;
