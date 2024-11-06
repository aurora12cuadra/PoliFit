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
    const { noBoleta, consultaData, actLaboralData, actFisicaData, toxicomaniasData, habitosDietData, transGastroData, ginecoObstreData, plieguesData, perimetrosData, diametrosData, bioimpedanciaData, bioquimicosData, kilocaloriasData, recordatorioData } = req.body;

    try {
        // Recuperar el numeroEmpleado del nutriólogo actual (desde el token)
        const numeroEmpleado = req.nutriologoId;

        // Crear la consulta principal
        const consulta = await Consulta.create({
            numeroEmpleado,
            noBoleta,
            fecha_consulta: consultaData.fecha_consulta,
            hora_consulta: consultaData.hora_consulta,
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
