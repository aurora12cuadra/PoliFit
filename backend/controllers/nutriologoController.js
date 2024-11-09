// controllers/nutriologoController.js
const Nutriologo = require('../models/Nutriologo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registrar un nuevo nutriólogo
exports.registrarNutriologo = async (req, res) => {
    try {
        const nuevoNutriologo = await Nutriologo.create(req.body);
        res.status(201).json(nuevoNutriologo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Autenticación de Nutriólogo
exports.loginNutriologo = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const nutriologo = await Nutriologo.findOne({ where: { email } });
        if (!nutriologo) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, nutriologo.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        // Generar JWT
        const token = jwt.sign(
            { id: nutriologo.numeroEmpleado, email: nutriologo.email },
            process.env.JWT_SECRET,
            { expiresIn: '10h' }
        );

        res.status(200).json({ token, nutriologo: { nombre: nutriologo.nombre, email: nutriologo.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los nutriólogos
exports.obtenerNutriologos = async (req, res) => {
    try {
        const nutriologos = await Nutriologo.findAll();
        res.status(200).json(nutriologos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un nutriólogo por ID
exports.obtenerNutriologoPorId = async (req, res) => {
    try {
        const nutriologo = await Nutriologo.findByPk(req.params.id);
        if (!nutriologo) {
            return res.status(404).json({ error: "Nutriólogo no encontrado" });
        }
        res.status(200).json(nutriologo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un nutriólogo por ID
exports.actualizarNutriologo = async (req, res) => {
    try {
        const nutriologo = await Nutriologo.findByPk(req.params.id);
        if (!nutriologo) {
            return res.status(404).json({ error: "Nutriólogo no encontrado" });
        }
        await nutriologo.update(req.body);
        res.status(200).json(nutriologo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un nutriólogo por ID
exports.eliminarNutriologo = async (req, res) => {
    try {
        const nutriologo = await Nutriologo.findByPk(req.params.id);
        if (!nutriologo) {
            return res.status(404).json({ error: "Nutriólogo no encontrado" });
        }
        await nutriologo.destroy();
        res.status(200).json({ message: "Nutriólogo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* const Nutriologo = require('../models/Nutriologo');

// Registrar un nuevo nutriólogo
exports.registrarNutriologo = async (req, res) => {
    try {
        const nuevoNutriologo = await Nutriologo.create(req.body);
        res.status(201).json(nuevoNutriologo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Autenticación de Nutriólogo
exports.loginNutriologo = async (req, res) => {
    // lógica para autenticar al nutriólogo
}; */