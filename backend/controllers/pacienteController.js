// controllers/pacienteController.js
const Paciente = require('../models/Paciente');
const { Op } = require('sequelize'); 

// Registrar Paciente
exports.registrarPaciente = async (req, res) => {
    try {
        // Añadir el nutriólogo a los datos del paciente usando req.nutriologoId
        const nuevoPaciente = await Paciente.create({ ...req.body, numeroEmpleado: req.nutriologoId });
        res.status(201).json(nuevoPaciente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los pacientes del nutriólogo autenticado
exports.obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.findAll({ where: { numeroEmpleado: req.nutriologoId } });
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un paciente específico por ID y verificar que pertenezca al nutriólogo autenticado
exports.obtenerPacientePorId = async (req, res) => {
    try {
        const paciente = await Paciente.findOne({ 
            where: { 
                noBoleta: req.params.id, 
                numeroEmpleado: req.nutriologoId 
            } 
        });
        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado o no pertenece al nutriólogo." });
        }
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Consultar un paciente por nombre y verificar que pertenezca al nutriólogo autenticado
// exports.obtenerPacientePorNombre = async (req, res) => {
//     try {
//         console.log("Nombre recibido:", req.query.nombre);
//         console.log("Token recibido:", req.headers.authorization);
//         const nombre = req.query.nombre;
//         const pacientes = await Paciente.findAll({
//             where: {
//                 nombre: {
//                     [Op.like]: `%${nombre}%`,
//                 },
//                 numeroEmpleado: req.nutriologoId,
//             },
//         });
//         res.status(200).json(pacientes);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//         console.log("Fallo en funcion de obtenerPacientePorNombre");
//     }
// };

exports.obtenerPacientePorNombre = async (req, res) => {
    const nombre = req.params.nombre
    try {
        const paciente = await Paciente.findAll({
            where: {
                nombre: { [Op.like]: `%${nombre}%` },
                numeroEmpleado: req.nutriologoId
            }
        });
        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado o no pertenece al nutriólogo." });
        }
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Buscar pacientes por nombre (maneja tanto GET como POST)
// exports.buscarPacientesPorNombre = async (req, res) => {
//     const nombre = req.params.nombre || req.body.nombre;

//     try {
//         const pacientes = await Paciente.findAll({
//             where: {
//                 nombre: { [Op.like]: `%${nombre}%` },
//                 numeroEmpleado: req.nutriologoId
//             }
//         });

//         if (pacientes.length === 0) {
//             return res.status(404).json({ error: "Paciente no encontrado o no pertenece al nutriólogo." });
//         }

//         res.status(200).json(pacientes);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Actualizar un paciente por ID
exports.actualizarPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findOne({ 
            where: { 
                noBoleta: req.params.id, 
                numeroEmpleado: req.nutriologoId 
            } 
        });
        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado o no pertenece al nutriólogo." });
        }
        await paciente.update(req.body);
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un paciente por ID
exports.eliminarPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findOne({ 
            where: { 
                noBoleta: req.params.id, 
                numeroEmpleado: req.nutriologoId 
            } 
        });
        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado o no pertenece al nutriólogo." });
        }
        await paciente.destroy();
        res.status(200).json({ message: "Paciente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// // controllers/pacienteController.js
// const Paciente = require('../models/Paciente');

// // Registrar Paciente
// exports.registrarPaciente = async (req, res) => {
//     try {
//         // Añadir el nutriólogo a los datos del paciente usando req.nutriologoId
//         const nuevoPaciente = await Paciente.create({ ...req.body, numeroEmpleado: req.nutriologoId });
//         res.status(201).json(nuevoPaciente);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Obtener todos los pacientes
// exports.obtenerPacientes = async (req, res) => {
//     try {
//         const pacientes = await Paciente.findAll();
//         res.status(200).json(pacientes);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Obtener un paciente por ID
// exports.obtenerPacientePorId = async (req, res) => {
//     try {
//         const paciente = await Paciente.findByPk(req.params.id);
//         if (!paciente) {
//             return res.status(404).json({ error: "Paciente no encontrado" });
//         }
//         res.status(200).json(paciente);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Actualizar un paciente por ID
// exports.actualizarPaciente = async (req, res) => {
//     try {
//         const paciente = await Paciente.findByPk(req.params.id);
//         if (!paciente) {
//             return res.status(404).json({ error: "Paciente no encontrado" });
//         }
//         await paciente.update(req.body);
//         res.status(200).json(paciente);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Eliminar un paciente por ID
// exports.eliminarPaciente = async (req, res) => {
//     try {
//         const paciente = await Paciente.findByPk(req.params.id);
//         if (!paciente) {
//             return res.status(404).json({ error: "Paciente no encontrado" });
//         }
//         await paciente.destroy();
//         res.status(200).json({ message: "Paciente eliminado correctamente" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// // controllers/pacienteController.js
// const Paciente = require('../models/Paciente');
// const jwt = require('jsonwebtoken');

// // Middleware para verificar el token JWT del nutriólogo
// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ error: 'Token no proporcionado o inválido.' });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.nutriologoId = decoded.id;
//         next();
//     } catch (error) {
//         res.status(401).json({ error: 'Token inválido o expirado.' });
//     }
// };

// // Registrar Paciente
// exports.registrarPaciente = async (req, res) => {
//     try {
//         // Verificar si existe el header de autorización
//         if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
//             return res.status(401).json({ error: 'Token de autorización no proporcionado o inválido.' });
//         }

//         // Verificar el token del nutriólogo
//         const token = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Verificar si el token decodificado tiene el id del nutriólogo
//         if (!decoded.id) {
//             return res.status(401).json({ error: 'Token inválido.' });
//         }

//         // Añadir el nutriólogo a los datos del paciente
//         // const nuevoPaciente = await Paciente.create({ ...req.body, nutriologoId: decoded.id });
//         const nuevoPaciente = await Paciente.create({ ...req.body, numeroEmpleado: decoded.id });

//         res.status(201).json(nuevoPaciente);
//     } catch (error) {
//         // Manejar posibles errores de JWT y otros errores
//         if (error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ error: 'Token inválido o expirado.' });
//         }

//         res.status(400).json({ error: error.message });
//     }
// };

// // Obtener todos los pacientes
// exports.obtenerPacientes = async (req, res) => {
//     try {
//         const pacientes = await Paciente.findAll();
//         res.status(200).json(pacientes);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Obtener un paciente por ID
// exports.obtenerPacientePorId = async (req, res) => {
//     try {
//         const paciente = await Paciente.findByPk(req.params.id);
//         if (!paciente) {
//             return res.status(404).json({ error: "Paciente no encontrado" });
//         }
//         res.status(200).json(paciente);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Actualizar un paciente por ID
// exports.actualizarPaciente = async (req, res) => {
//     try {
//         const paciente = await Paciente.findByPk(req.params.id);
//         if (!paciente) {
//             return res.status(404).json({ error: "Paciente no encontrado" });
//         }
//         await paciente.update(req.body);
//         res.status(200).json(paciente);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Eliminar un paciente por ID
// exports.eliminarPaciente = async (req, res) => {
//     try {
//         const paciente = await Paciente.findByPk(req.params.id);
//         if (!paciente) {
//             return res.status(404).json({ error: "Paciente no encontrado" });
//         }
//         await paciente.destroy();
//         res.status(200).json({ message: "Paciente eliminado correctamente" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



// exports.registrarPaciente = async (req, res) => {
//     try {
//         // Verificar el token del nutriólogo
//         const token = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Añadir el nutriólogo a los datos del paciente
//         const nuevoPaciente = await Paciente.create({ ...req.body, nutriologoId: decoded.id });

//         res.status(201).json(nuevoPaciente);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// exports.registrarPaciente = async (req, res) => {
//     try {
//         const nuevoPaciente = await Paciente.create(req.body);
//         res.status(201).json(nuevoPaciente);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };