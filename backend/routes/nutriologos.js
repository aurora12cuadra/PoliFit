// routes/nutriologos.js
const express = require('express');
const router = express.Router();
const nutriologoController = require('../controllers/nutriologoController');

// Registrar nutriólogo
router.post('/register', nutriologoController.registrarNutriologo);

// Iniciar sesión
router.post('/login', nutriologoController.loginNutriologo);

// Obtener todos los nutriólogos (GET)
router.get('/', nutriologoController.obtenerNutriologos);

// Obtener un nutriólogo por ID (GET)
router.get('/:id', nutriologoController.obtenerNutriologoPorId);

// Actualizar un nutriólogo por ID (PATCH)
router.patch('/:id', nutriologoController.actualizarNutriologo);

// Eliminar un nutriólogo por ID (DELETE)
router.delete('/:id', nutriologoController.eliminarNutriologo);

module.exports = router;

/* const express = require('express');
const router = express.Router();
const nutriologoController = require('../controllers/nutriologoController');

// Registrar nutriólogo
router.post('/register', nutriologoController.registrarNutriologo);

// Iniciar sesión
router.post('/login', nutriologoController.loginNutriologo);

module.exports = router;
 */