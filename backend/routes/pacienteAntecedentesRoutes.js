// routes/pacienteAntecedentesRoutes.js
const express = require('express');
const router = express.Router();
const pacienteAntecedentesController = require('../controllers/pacienteAntecedentesController');
const pacienteController = require('../controllers/pacienteController');
const verifyToken = require('../middlewares/auth'); // Middleware para verificar autenticación

router.get('/nombre/:nombre', verifyToken, pacienteController.obtenerPacientePorNombre);

// Crear un paciente completo con antecedentes
router.post('/register', verifyToken, pacienteAntecedentesController.registrarPacienteCompleto);

// Obtener todos los pacientes del nutriólogo autenticado con sus antecedentes
router.get('/getAll', verifyToken, pacienteController.obtenerPacientes);

// Obtener todos los pacientes del nutriólogo autenticado con sus antecedentes
router.get('/getAllAntecedentes', verifyToken, pacienteAntecedentesController.obtenerTodosPacientesConAntecedentes);

// Obtener un paciente específico con sus antecedentes por ID
router.get('/:id', verifyToken, pacienteAntecedentesController.obtenerPacienteCompleto);

// Actualizar un paciente y sus antecedentes por ID
router.put('/:id', verifyToken, pacienteAntecedentesController.actualizarPacienteYAntecedentes);

// Eliminar un paciente y sus antecedentes por ID
router.delete('/:id', verifyToken, pacienteAntecedentesController.eliminarPacienteYAntecedentes);

module.exports = router;