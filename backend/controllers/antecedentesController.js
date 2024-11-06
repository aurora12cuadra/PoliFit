const AntecHeredofam = require('../models/AntecHeredofam');
const AntecPerPat = require('../models/AntecPerPat');
const Paciente = require('../models/Paciente');
const jwt = require('jsonwebtoken');

// Crear antecedentes heredofamiliares y personales patológicos para un paciente
exports.crearAntecedentes = async (req, res) => {
    const { noBoleta } = req.body;

    try {
        const paciente = await Paciente.findOne({ where: { noBoleta: noBoleta } });
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado.' });
        }

        // Crear antecedentes heredofamiliares
        const heredofamiliares = await AntecHeredofam.create({ ...req.body.heredofam, noBoleta });

        // Crear antecedentes personales patológicos
        const personalesPatologicos = await AntecPerPat.create({ ...req.body.perPat, noBoleta });

        res.status(201).json({ heredofamiliares, personalesPatologicos });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener antecedentes por noBoleta
exports.obtenerAntecedentes = async (req, res) => {
    const { noBoleta } = req.params;

    try {
        const heredofamiliares = await AntecHeredofam.findOne({ where: { noBoleta } });
        const personalesPatologicos = await AntecPerPat.findOne({ where: { noBoleta } });

        if (!heredofamiliares && !personalesPatologicos) {
            return res.status(404).json({ error: 'No se encontraron antecedentes para este paciente.' });
        }

        res.status(200).json({ heredofamiliares, personalesPatologicos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar antecedentes heredofamiliares y personales patológicos de un paciente
exports.actualizarAntecedentes = async (req, res) => {
    const { noBoleta } = req.params;

    try {
        const heredofamiliares = await AntecHeredofam.findOne({ where: { noBoleta } });
        const personalesPatologicos = await AntecPerPat.findOne({ where: { noBoleta } });

        if (heredofamiliares) {
            await heredofamiliares.update(req.body.heredofam);
        }
        if (personalesPatologicos) {
            await personalesPatologicos.update(req.body.perPat);
        }

        res.status(200).json({ heredofamiliares, personalesPatologicos });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar antecedentes heredofamiliares y personales patológicos de un paciente
exports.eliminarAntecedentes = async (req, res) => {
    const { noBoleta } = req.params;

    try {
        const heredofamiliares = await AntecHeredofam.findOne({ where: { noBoleta } });
        const personalesPatologicos = await AntecPerPat.findOne({ where: { noBoleta } });

        if (heredofamiliares) {
            await heredofamiliares.destroy();
        }
        if (personalesPatologicos) {
            await personalesPatologicos.destroy();
        }

        res.status(200).json({ message: 'Antecedentes eliminados correctamente.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
