// controllers/pacienteAntecedentesController.js
const Paciente = require('../models/Paciente');
const AntecHeredofam = require('../models/AntecHeredofam');
const AntecPerPat = require('../models/AntecPerPat');

// Registrar un paciente y sus antecedentes asociados
exports.registrarPacienteCompleto = async (req, res) => {
    const { noBoleta, pacienteData, heredofamData, perPatData } = req.body;

    try {
        console.log("Payload recibido en el backend:", req.body);
        // Recuperar el numeroEmpleado del nutriólogo actual (desde el token)
        const numeroEmpleado = req.nutriologoId;
        console.log("Número de empleado:", numeroEmpleado);
        // Crear el paciente
        const paciente = await Paciente.create({
            ...pacienteData,
            numeroEmpleado,
            noBoleta,
        });

        // Registrar los antecedentes asociados solo si sus datos están presentes
        if (heredofamData) {
            console.log("Datos heredofamiliares:", heredofamData);
            await AntecHeredofam.create({ ...heredofamData, noBoleta });
        }

        if (perPatData) {
            console.log("Datos personales patológicos:", perPatData);
            await AntecPerPat.create({ ...perPatData, noBoleta });
        }

        res.status(201).json({ message: 'Paciente y antecedentes registrados exitosamente' });
    } catch (error) {
        console.error("Error al registrar el paciente:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener un paciente y sus antecedentes asociados por ID
exports.obtenerPacienteCompleto = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el paciente por noBoleta y asegurarse de que pertenezca al nutriólogo autenticado
        const paciente = await Paciente.findOne({
            where: {
                noBoleta: id,
                numeroEmpleado: req.nutriologoId,
            },
        });

        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado o no pertenece al nutriólogo." });
        }

        // Obtener los antecedentes asociados al paciente
        const heredofamiliares = await AntecHeredofam.findOne({ where: { noBoleta: id } });
        const personalesPatologicos = await AntecPerPat.findOne({ where: { noBoleta: id } });

        // Responder con el paciente y sus antecedentes
        res.status(200).json({
            paciente,
            antecedentes: {
                heredofamiliares: heredofamiliares || null,
                personalesPatologicos: personalesPatologicos || null,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los pacientes del nutriólogo autenticado junto con sus antecedentes
exports.obtenerTodosPacientesConAntecedentes = async (req, res) => {
    try {
        // Obtener todos los pacientes asociados al nutriólogo autenticado
        const pacientes = await Paciente.findAll({
            where: { numeroEmpleado: req.nutriologoId },
        });

        // Si no se encuentran pacientes, devolver un mensaje adecuado
        if (pacientes.length === 0) {
            return res.status(404).json({ error: "No se encontraron pacientes para este nutriólogo." });
        }

        // Mapear cada paciente con sus antecedentes heredofamiliares y personales patológicos
        const pacientesConAntecedentes = await Promise.all(
            pacientes.map(async (paciente) => {
                const heredofamiliares = await AntecHeredofam.findOne({
                    where: { noBoleta: paciente.noBoleta },
                });
                const personalesPatologicos = await AntecPerPat.findOne({
                    where: { noBoleta: paciente.noBoleta },
                });

                return {
                    paciente,
                    antecedentes: {
                        heredofamiliares: heredofamiliares || null,
                        personalesPatologicos: personalesPatologicos || null,
                    },
                };
            })
        );

        // Responder con la lista completa de pacientes y sus antecedentes
        res.status(200).json(pacientesConAntecedentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Eliminar un paciente y sus antecedentes asociados por ID
exports.eliminarPacienteYAntecedentes = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el paciente por noBoleta y verificar que pertenezca al nutriólogo autenticado
        const paciente = await Paciente.findOne({
            where: {
                noBoleta: id,
                numeroEmpleado: req.nutriologoId,
            },
        });

        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado o no pertenece al nutriólogo." });
        }

        // Eliminar antecedentes heredofamiliares y personales patológicos, si existen
        await AntecHeredofam.destroy({ where: { noBoleta: id } });
        await AntecPerPat.destroy({ where: { noBoleta: id } });

        // Eliminar el paciente
        await paciente.destroy();

        res.status(200).json({ message: "Paciente y sus antecedentes eliminados correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Actualizar un paciente y sus antecedentes asociados por ID
exports.actualizarPacienteYAntecedentes = async (req, res) => {
    const { id } = req.params;
    const { pacienteData, heredofamData, perPatData } = req.body;

    try {
        // Buscar el paciente por noBoleta y verificar que pertenezca al nutriólogo autenticado
        const paciente = await Paciente.findOne({
            where: {
                noBoleta: id,
                numeroEmpleado: req.nutriologoId,
            },
        });

        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado o no pertenece al nutriólogo." });
        }

        // Actualizar los datos del paciente
        if (pacienteData) {
            await paciente.update(pacienteData);
        }

        // Actualizar antecedentes heredofamiliares, si los datos están presentes
        if (heredofamData) {
            const heredofamiliares = await AntecHeredofam.findOne({ where: { noBoleta: id } });
            if (heredofamiliares) {
                await heredofamiliares.update(heredofamData);
            } else {
                // Crear antecedentes heredofamiliares si no existen
                await AntecHeredofam.create({ ...heredofamData, noBoleta: id });
            }
        }

        // Actualizar antecedentes personales patológicos, si los datos están presentes
        if (perPatData) {
            const personalesPatologicos = await AntecPerPat.findOne({ where: { noBoleta: id } });
            if (personalesPatologicos) {
                await personalesPatologicos.update(perPatData);
            } else {
                // Crear antecedentes personales patológicos si no existen
                await AntecPerPat.create({ ...perPatData, noBoleta: id });
            }
        }

        res.status(200).json({ message: "Paciente y sus antecedentes actualizados correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



/* Registrar un paciente completo
POST http://localhost:3000/paciente/register
Authorization: Bearer <tu_token_aqui>
Content-Type: application/json

{
  "noBoleta": "2019988777",
  "pacienteData": {
    "nombre": "Juan",
    "apellidoPaterno": "Pérez",
    "apellidoMaterno": "Gómez",
    "fechaNacimiento": "1993-05-12",
    "edad": 31,
    "sexo": "Masculino",
    "estadoCivil": "Soltero",
    "ocupacion": "Estudiante",
    "telefono": "5555555555",
    "email": "juan.perez@example.com",
    "escuela": "Universidad de Ejemplo",
    "carrera": "Ingeniería",
    "domicilio": "Calle Falsa 123",
    "turno": "Matutino",
    "tipoSangre": "O+",
    "motivoVisita": "Consulta general",
    "padecimientoActual": "Dolor de cabeza frecuente"
  },
  "heredofamData": {
    "alerg": "Polen",
    "cardiologicos": "Sí",
    "diabetes": "No",
    "cancer": "No",
    "obesidad": "Sí",
    "renales": "No",
    "hipertension": "Sí",
    "anemia": "No",
    "desordenes_aux": "No",
    "hepatobiliares": "No",
    "dislipidimias": "No",
    "otros": "Ninguno"
  },
  "perPatData": {
    "alergias": "Penicilina",
    "cadiologicos": "No",
    "diabetes": "No",
    "cancer": "No",
    "cirugias": "Apendicectomía",
    "obesidad": "No",
    "renales": "No",
    "hipertension": "No",
    "anemia": "No",
    "tiroides": "No",
    "desordenes_aux": "No",
    "hepatobiliares": "No",
    "dislipidimias": "No",
    "hepatitis": "No",
    "otros": "Ninguno"
  }
}


### Obtener un paciente completo por ID
GET http://localhost:3000/paciente/2019988777
Authorization: Bearer <tu_token_aqui>
Content-Type: application/json

### Obtener todos los pacientes con antecedentes
GET http://localhost:3000/pacientes
Authorization: Bearer <tu_token_aqui>
Content-Type: application/json

### Actualizar un paciente completo por ID
PUT http://localhost:3000/paciente/2019988777
Authorization: Bearer <tu_token_aqui>
Content-Type: application/json

{
  "pacienteData": {
    "telefono": "5551234567",
    "email": "juan.perez@update.com",
    "ocupacion": "Ingeniero"
  },
  "heredofamData": {
    "diabetes": "Sí",
    "hipertension": "No",
    "otros": "Asma"
  },
  "perPatData": {
    "alergias": "Lácteos",
    "cirugias": "Apendicectomía",
    "hepatitis": "No"
  }
}
/* Eliminar un paciente completo por ID
DELETE http://localhost:3000/paciente/2019988777
Authorization: Bearer <tu_token_aqui>
Content-Type: application/json*/