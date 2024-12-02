// controllers/citaController.js
// controllers/citaController.js
const Cita = require('../models/Cita');
const { Op } = require('sequelize');

// Registrar una nueva cita
exports.registrarCita = async (req, res) => {
    try {
        // Añadir el número de empleado del nutriólogo autenticado
        const nuevaCita = await Cita.create({ ...req.body, numeroEmpleado: req.nutriologoId });
        res.status(201).json(nuevaCita);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las citas del nutriólogo autenticado
exports.obtenerCitas = async (req, res) => {
    try {
        const citas = await Cita.findAll({ where: { numeroEmpleado: req.nutriologoId } });
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una cita específica por ID y verificar que pertenezca al nutriólogo autenticado
exports.obtenerCitaPorId = async (req, res) => {
    try {
        const cita = await Cita.findOne({ 
            where: { 
                idCita: req.params.id, 
                numeroEmpleado: req.nutriologoId 
            } 
        });
        if (!cita) {
            return res.status(404).json({ error: "Cita no encontrada o no pertenece al nutriólogo." });
        }
        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una cita por ID
exports.actualizarCita = async (req, res) => {
    try {
        const cita = await Cita.findOne({ 
            where: { 
                idCita: req.params.id, 
                numeroEmpleado: req.nutriologoId 
            } 
        });
        if (!cita) {
            return res.status(404).json({ error: "Cita no encontrada o no pertenece al nutriólogo." });
        }
        await cita.update(req.body);
        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una cita por ID
exports.eliminarCita = async (req, res) => {
    try {
        const cita = await Cita.findOne({ 
            where: { 
                idCita: req.params.id, 
                numeroEmpleado: req.nutriologoId 
            } 
        });
        if (!cita) {
            return res.status(404).json({ error: "Cita no encontrada o no pertenece al nutriólogo." });
        }
        await cita.destroy();
        res.status(200).json({ message: "Cita eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener citas por fecha específica
exports.obtenerCitasPorFecha = async (req, res) => {
    const fecha = req.params.fecha; // Formato esperado 'YYYY-MM-DD'
    try {
        const citas = await Cita.findAll({
            where: {
                fecha_consulta: fecha,
                numeroEmpleado: req.nutriologoId
            }
        });
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener citas de un paciente específico
// exports.obtenerCitasPorPaciente = async (req, res) => {
//     const noBoleta = req.params.noBoleta;
//     try {
//         const citas = await Cita.findAll({
//             where: {
//                 noBoleta: noBoleta,
//                 numeroEmpleado: req.nutriologoId
//             }
//         });
//         res.status(200).json(citas);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Obtener citas en un rango de fechas
exports.obtenerCitasPorRangoFechas = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query; // Formato esperado 'YYYY-MM-DD'

    try {
        const citas = await Cita.findAll({
            where: {
                fecha_consulta: {
                    [Op.between]: [fechaInicio, fechaFin]
                },
                numeroEmpleado: req.nutriologoId
            }
        });
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};