// routes/nutriologos.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth');
const nutriologoController = require('../controllers/nutriologoController');

// Registrar nutriólogo
router.post('/register', nutriologoController.registrarNutriologo);

// Iniciar sesión
router.post('/login', nutriologoController.loginNutriologo);

// Obtener el perfil del nutriólogo autenticado
router.get('/perfil', verifyToken, nutriologoController.obtenerPerfilNutriologo);

// Actualizar un nutriólogo por ID (PATCH)
router.patch('/:id', verifyToken, nutriologoController.actualizarNutriologo);

// Obtener todos los nutriólogos (GET)
router.get('/', nutriologoController.obtenerNutriologos);

// Obtener un nutriólogo por ID (GET)
router.get('/:id', nutriologoController.obtenerNutriologoPorId);

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