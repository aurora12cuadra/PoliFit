// routes/consulta.js
const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
const verifyToken = require('../middlewares/auth');

// Ruta para registrar una consulta completa
router.post('/register', verifyToken, consultaController.registrarConsultaCompleta);
router.get('/getAll', verifyToken, consultaController.obtenerTodasLasConsultas);
router.get('/getMediciones/:noBoleta', verifyToken, consultaController.obtenerUltimaConsultaConPlieguesYDiametros);

router.get('/paciente/:noBoleta/consulta/:id_consulta', verifyToken, consultaController.obtenerConsultaPorIdYNoBoleta);
router.get('/paciente/:noBoleta', verifyToken, consultaController.obtenerConsultasPorNoBoleta);

module.exports = router;
