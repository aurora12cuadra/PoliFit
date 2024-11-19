// controllers/consultaController.js
const Consulta = require("../models/Consulta");
const ActLaboral = require("../models/ActLaboral");
const ActFisica = require("../models/ActFisica");
const Toxicomanias = require("../models/Toxicomanias");
const HabitosDiet = require("../models/HabitosDiet");
const TransGastro = require("../models/TransGastro");
const GinecoObstre = require("../models/GinecoObstre");
const Pliegues = require("../models/Pliegues");
const Perimetros = require("../models/Perimetros");
const Diametros = require("../models/Diametros");
const Bioimpedancia = require("../models/Bioimpedancia");
const Bioquimicos = require("../models/Bioquimicos");
const Kilocalorias = require("../models/Kilocalorias");
const Recordatorio = require("../models/Recordatorio");
const Paciente = require("../models/Paciente");

// Registrar una consulta y sus modelos asociados
exports.registrarConsultaCompleta = async (req, res) => {
  const {
    noBoleta,
    actLaboralData,
    actFisicaData,
    toxicomaniasData,
    habitosDietData,
    transGastroData,
    ginecoObstreData,
    plieguesData,
    perimetrosData,
    diametrosData,
    bioimpedanciaData,
    bioquimicosData,
    kilocaloriasData,
    recordatorioData,
  } = req.body;

  try {
    // Recuperar el numeroEmpleado del nutriólogo actual (desde el token)
    const numeroEmpleado = req.nutriologoId;

    // Crear la consulta principal
    const consulta = await Consulta.create({
      numeroEmpleado,
      noBoleta,
      hora_consulta: new Date().toLocaleTimeString("en-GB", { hour12: false }),
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
      await Toxicomanias.create({
        ...toxicomaniasData,
        id_consulta: idConsulta,
      });
    }

    if (habitosDietData) {
      await HabitosDiet.create({ ...habitosDietData, id_consulta: idConsulta });
    }

    if (transGastroData) {
      await TransGastro.create({ ...transGastroData, id_consulta: idConsulta });
    }

    if (ginecoObstreData) {
      await GinecoObstre.create({
        ...ginecoObstreData,
        id_consulta: idConsulta,
      });
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
      await Bioimpedancia.create({
        ...bioimpedanciaData,
        id_consulta: idConsulta,
      });
    }

    if (bioquimicosData) {
      await Bioquimicos.create({ ...bioquimicosData, id_consulta: idConsulta });
    }

    if (kilocaloriasData) {
      await Kilocalorias.create({
        ...kilocaloriasData,
        id_consulta: idConsulta,
      });
    }

    if (recordatorioData) {
      await Recordatorio.create({
        ...recordatorioData,
        id_consulta: idConsulta,
      });
    }

    res
      .status(201)
      .json({
        message: "Consulta y modelos asociados registrados exitosamente",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Metodo para obtener todas las consultas

exports.obtenerTodasLasConsultas = async (req, res) => {
  try {
    // Recuperar el numeroEmpleado del nutriólogo actual (desde el token)
    const numeroEmpleado = req.nutriologoId;
    console.log("Iniciando obtención de todas las consultas");

    // Consultar todas las consultas con el modelo Paciente
    const consultas = await Consulta.findAll({
      numeroEmpleado,
      include: [
        {
          model: Paciente,
          attributes: [
            "nombre",
            "apellidoPaterno",
            "apellidoMaterno",
            "email",
            "telefono",
            "sexo",
          ],
        },
      ],
      order: [["fecha_consulta", "DESC"]],
    });

    // Si no hay consultas, retorna un mensaje informativo
    if (!consultas || consultas.length === 0) {
      console.log("No se encontraron consultas");
      return res.status(404).json({ error: "No se encontraron consultas" });
    }

    // Formatear los datos
    const consultasFormateadas = consultas.map((consulta) => {
      const paciente = consulta.Paciente || {};
      return {
        id: consulta.id_consulta,
        paciente: `${paciente.nombre} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}`,
        email: paciente.email,
        telefono: paciente.telefono,
        fechaConsulta: consulta.fecha_consulta,
        hora: consulta.hora_consulta,
        sexo: paciente.sexo || "No especificado",
      };
    });

    console.log(
      "Consultas obtenidas correctamente:",
      consultasFormateadas.length
    );
    res.status(200).json(consultasFormateadas);
  } catch (error) {
    console.error("Error al obtener todas las consultas:", error.message);
    res.status(500).json({
      error: "Error al obtener las consultas",
      details: error.message,
    });
  }
};
