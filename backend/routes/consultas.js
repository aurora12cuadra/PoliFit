// routes/consulta.js
const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
const verifyToken = require('../middlewares/auth');
//const multer = require('multer');

// Ruta para registrar una consulta completa
router.post('/register', verifyToken, consultaController.registrarConsultaCompleta);
router.get('/getAll', verifyToken, consultaController.obtenerTodasLasConsultas);
router.get('/getAllIMC', verifyToken, consultaController.obtenerUltimasConsultasIMC);
router.get('/getMediciones/:noBoleta', verifyToken, consultaController.obtenerUltimaConsultaMediciones);
router.get('/consulta/:id_consulta', verifyToken, consultaController.obtenerConsultaPorId);
router.get('/paciente/:noBoleta/consulta/:id_consulta', verifyToken, consultaController.obtenerConsultaPorIdYNoBoleta);
router.get('/paciente/:noBoleta', verifyToken, consultaController.obtenerConsultasPorNoBoleta);


module.exports = router;
