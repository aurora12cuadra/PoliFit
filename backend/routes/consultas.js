// routes/consulta.js
const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
const verifyToken = require('../middlewares/auth');

// Ruta para registrar una consulta completa
router.post('/register', verifyToken, consultaController.registrarConsultaCompleta);

module.exports = router;
