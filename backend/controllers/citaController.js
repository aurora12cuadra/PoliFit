const { Op } = require('sequelize');
const Cita = require('../models/Cita'); // Ajusta la ruta según tu estructura de archivos

// Controlador para manejar operaciones CRUD
const citaController = {
  // Crear una nueva cita
  async crearCita(req, res) {
    try {
      const { fecha_consulta, hora_consulta, numeroEmpleado, noBoleta } = req.body;
      const nuevaCita = await Cita.create({
        fecha_consulta,
        hora_consulta,
        numeroEmpleado,
        noBoleta,
      });
      res.status(201).json(nuevaCita);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la cita', detalles: error.message });
    }
  },

  // Obtener todas las citas o filtrar por fecha, número de empleado, etc.
  async obtenerCitas(req, res) {
    try {
      const { fecha_consulta, numeroEmpleado, noBoleta } = req.query;
      const where = {};

      if (fecha_consulta) where.fecha_consulta = fecha_consulta;
      if (numeroEmpleado) where.numeroEmpleado = numeroEmpleado;
      if (noBoleta) where.noBoleta = noBoleta;

      const citas = await Cita.findAll({ where });
      res.status(200).json(citas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener citas', detalles: error.message });
    }
  },

  // Obtener una cita por ID
  async obtenerCitaPorId(req, res) {
    try {
      const { id } = req.params;
      const cita = await Cita.findByPk(id);
      if (!cita) {
        return res.status(404).json({ error: 'Cita no encontrada' });
      }
      res.status(200).json(cita);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la cita', detalles: error.message });
    }
  },

  // Actualizar una cita por ID
  async actualizarCita(req, res) {
    try {
      const { id } = req.params;
      const { fecha_consulta, hora_consulta, numeroEmpleado, noBoleta } = req.body;
      const cita = await Cita.findByPk(id);

      if (!cita) {
        return res.status(404).json({ error: 'Cita no encontrada' });
      }

      await cita.update({
        fecha_consulta,
        hora_consulta,
        numeroEmpleado,
        noBoleta,
      });

      res.status(200).json(cita);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la cita', detalles: error.message });
    }
  },

  // Eliminar una cita por ID
  async eliminarCita(req, res) {
    try {
      const { id } = req.params;
      const cita = await Cita.findByPk(id);

      if (!cita) {
        return res.status(404).json({ error: 'Cita no encontrada' });
      }

      await cita.destroy();
      res.status(200).json({ mensaje: 'Cita eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la cita', detalles: error.message });
    }
  },
};

module.exports = citaController;
