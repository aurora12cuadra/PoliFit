// controllers/consultaController.js
const Consulta = require('../models/Consulta');
const ActLaboral = require('../models/ActLaboral');
const ActFisica = require('../models/ActFisica');
const Toxicomanias = require('../models/Toxicomanias');
const HabitosDiet = require('../models/HabitosDiet');
const TransGastro = require('../models/TransGastro');
const GinecoObstre = require('../models/GinecoObstre');
const Pliegues = require('../models/Pliegues');
const Perimetros = require('../models/Perimetros');
const Diametros = require('../models/Diametros');
const Bioimpedancia = require('../models/Bioimpedancia');
const Bioquimicos = require('../models/Bioquimicos');
const Kilocalorias = require('../models/Kilocalorias');
const Recordatorio = require('../models/Recordatorio');

// Registrar una consulta y sus modelos asociados
exports.registrarConsultaCompleta = async (req, res) => {
    const { noBoleta, actLaboralData, actFisicaData, toxicomaniasData, habitosDietData, transGastroData, ginecoObstreData, plieguesData, perimetrosData, diametrosData, bioimpedanciaData, bioquimicosData, kilocaloriasData, recordatorioData } = req.body;

    try {
        // Recuperar el numeroEmpleado del nutriólogo actual (desde el token)
        const numeroEmpleado = req.nutriologoId;

        // Crear la consulta principal
        const consulta = await Consulta.create({
            numeroEmpleado,
            noBoleta,
            hora_consulta: new Date().toLocaleTimeString('en-GB', { hour12: false }),
        });

        const idConsulta = consulta.id_consulta;

        // Registrar los modelos asociados, solo si sus datos están presentes
        if (actLaboralData) {
            await ActLaboral.create({ ...actLaboralData, id_consulta: idConsulta });
        }

        if (actFisicaData) {
            await ActFisica.create({ ...actFisicaData, id_consulta: idConsulta });
        }

        if (toxicomaniasData) {
            await Toxicomanias.create({ ...toxicomaniasData, id_consulta: idConsulta });
        }

        if (habitosDietData) {
            await HabitosDiet.create({ ...habitosDietData, id_consulta: idConsulta });
        }

        if (transGastroData) {
            await TransGastro.create({ ...transGastroData, id_consulta: idConsulta });
        }

        if (ginecoObstreData) {
            await GinecoObstre.create({ ...ginecoObstreData, id_consulta: idConsulta });
        }

        if (plieguesData) {
            await Pliegues.create({ ...plieguesData, id_consulta: idConsulta });
        }

        if (perimetrosData) {
            await Perimetros.create({ ...perimetrosData, id_consulta: idConsulta });
        }

        if (diametrosData) {
            await Diametros.create({ ...diametrosData, id_consulta: idConsulta });
        }

        if (bioimpedanciaData) {
            await Bioimpedancia.create({ ...bioimpedanciaData, id_consulta: idConsulta });
        }

        if (bioquimicosData) {
            await Bioquimicos.create({ ...bioquimicosData, id_consulta: idConsulta });
        }

        if (kilocaloriasData) {
            await Kilocalorias.create({ ...kilocaloriasData, id_consulta: idConsulta });
        }

        if (recordatorioData) {
            await Recordatorio.create({ ...recordatorioData, id_consulta: idConsulta });
        }

        res.status(201).json({ message: 'Consulta y modelos asociados registrados exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una consulta específica por id_consulta y noBoleta del paciente
exports.obtenerConsultaPorIdYNoBoleta = async (req, res) => {
    const { id_consulta, noBoleta } = req.params;

    try {
        const consulta = await Consulta.findOne({
            where: { id_consulta, noBoleta, numeroEmpleado: req.nutriologoId },
            include: [
                { model: ActLaboral },
                { model: ActFisica },
                { model: Toxicomanias },
                { model: HabitosDiet },
                { model: TransGastro },
                { model: GinecoObstre },
                { model: Pliegues },
                { model: Perimetros },
                { model: Diametros },
                { model: Bioimpedancia },
                { model: Bioquimicos },
                { model: Kilocalorias },
                { model: Recordatorio }
            ]
        });

        if (!consulta) {
            return res.status(404).json({ error: "Consulta no encontrada o no pertenece al nutriólogo." });
        }

        res.status(200).json(consulta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Obtener todas las consultas de un paciente específico por noBoleta
exports.obtenerConsultasPorNoBoleta = async (req, res) => {
    const noBoleta = req.params.noBoleta;

    try {
        const consultas = await Consulta.findAll({
            where: { noBoleta, numeroEmpleado: req.nutriologoId },
            include: [
                { model: ActLaboral },
                { model: ActFisica },
                { model: Toxicomanias },
                { model: HabitosDiet },
                { model: TransGastro },
                { model: GinecoObstre },
                { model: Pliegues },
                { model: Perimetros },
                { model: Diametros },
                { model: Bioimpedancia },
                { model: Bioquimicos },
                { model: Kilocalorias },
                { model: Recordatorio }
            ]
        });

        if (!consultas || consultas.length === 0) {
            return res.status(404).json({ error: "No se encontraron consultas para este paciente o no pertenece al nutriólogo." });
        }

        res.status(200).json(consultas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Obtener una consulta específica por id_consulta y noBoleta del paciente
exports.obtenerConsultaPorIdYNoBoleta = async (req, res) => {
    const { id_consulta, noBoleta } = req.params;

    try {
        const consulta = await Consulta.findOne({
            where: { id_consulta, noBoleta, numeroEmpleado: req.nutriologoId },
            include: [
                { model: ActLaboral },
                { model: ActFisica },
                { model: Toxicomanias },
                { model: HabitosDiet },
                { model: TransGastro },
                { model: GinecoObstre },
                { model: Pliegues },
                { model: Perimetros },
                { model: Diametros },
                { model: Bioimpedancia },
                { model: Bioquimicos },
                { model: Kilocalorias },
                { model: Recordatorio }
            ]
        });

        if (!consulta) {
            return res.status(404).json({ error: "Consulta no encontrada o no pertenece al nutriólogo." });
        }
        const paciente = await Paciente.findOne({ 
            where: { 
                noBoleta: req.params.id, 
                numeroEmpleado: req.nutriologoId 
            } 
        });
        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado o no pertenece al nutriólogo." });
        }
        res.status(201).json({consulta, paciente});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};