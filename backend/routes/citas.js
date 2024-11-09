const express = require('express');
const citaController = require('../controllers/citaController'); // Ajusta la ruta según tu estructura de archivos
const router = express.Router();

router.post('/citas', citaController.crearCita);
router.get('/citas', citaController.obtenerCitas);
router.get('/citas/:id', citaController.obtenerCitaPorId);
router.put('/citas/:id', citaController.actualizarCita);
router.delete('/citas/:id', citaController.eliminarCita);

module.exports = router;
