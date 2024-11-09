// routes/pacientes.js
const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const verifyToken = require('../middlewares/auth');

router.post('/register', verifyToken, pacienteController.registrarPaciente);
router.get('/nombre/:nombre', verifyToken, pacienteController.obtenerPacientePorNombre);
router.get('/', verifyToken, pacienteController.obtenerPacientes);
router.get('/:id', verifyToken, pacienteController.obtenerPacientePorId);
router.patch('/:id', verifyToken, pacienteController.actualizarPaciente);
router.delete('/:id', verifyToken, pacienteController.eliminarPaciente);
// router.get('/buscar/:nombre', verifyToken, pacienteController.buscarPacientesPorNombre);
// router.post('/buscar', verifyToken, pacienteController.buscarPacientesPorNombre);

module.exports = router;


// // routes/pacientes.js
// const express = require('express');
// const router = express.Router();
// const pacienteController = require('../controllers/pacienteController');

// // Registrar nuevo paciente
// router.post('/register', pacienteController.registrarPaciente);

// // Obtener todos los pacientes (GET)
// router.get('/', pacienteController.obtenerPacientes);

// // Obtener un paciente por ID (GET)
// router.get('/:id', pacienteController.obtenerPacientePorId);

// // Actualizar un paciente por ID (PATCH)
// router.patch('/:id', pacienteController.actualizarPaciente);

// // Eliminar un paciente por ID (DELETE)
// router.delete('/:id', pacienteController.eliminarPaciente);

// module.exports = router;
