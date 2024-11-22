// models/Paciente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Paciente = sequelize.define('Paciente', {
    noBoleta: { type: DataTypes.STRING(60), primaryKey: true },
    nombre: { type: DataTypes.STRING(60), allowNull: false },
    apellidoPaterno: { type: DataTypes.STRING(60), allowNull: false },
    apellidoMaterno: { type: DataTypes.STRING(60), allowNull: false },
    fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: false },
    edad: { type: DataTypes.INTEGER, allowNull: true },
    sexo: { type: DataTypes.STRING(60), allowNull: true },
    estadoCivil: { type: DataTypes.STRING(60), allowNull: true },
    ocupacion: { type: DataTypes.STRING(60), allowNull: true },
    telefono: { type: DataTypes.STRING(20), allowNull: true },
    email: { type: DataTypes.STRING(100), allowNull: false },
    escuela: { type: DataTypes.STRING(60), allowNull: true },
    carrera: { type: DataTypes.STRING(100), allowNull: true },
    domicilio: { type: DataTypes.STRING(60), allowNull: true },
    turno: { type: DataTypes.STRING(50), allowNull: true },
    tipoSangre: { type: DataTypes.STRING(50), allowNull: true },
    motivoVisita: { type: DataTypes.TEXT, allowNull: true },
    padecimientoActual: { type: DataTypes.TEXT, allowNull: true },
    fechaRegistro: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    numeroEmpleado: { type: DataTypes.STRING(60), allowNull: false, references: { model: 'Nutriologos', key: 'numeroEmpleado' } }
});

module.exports = Paciente;

// // models/Paciente.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Paciente = sequelize.define('Paciente', {
//     nombre: { type: DataTypes.STRING, allowNull: false },
//     apellidoMaterno: { type: DataTypes.STRING, allowNull: false },
//     apellidoPaterno: { type: DataTypes.STRING, allowNull: false },
//     fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: false },
//     // Campo virtual para calcular la edad, edad: { type: DataTypes.INTEGER, allowNull: false }
//     edad: { 
//         type: DataTypes.VIRTUAL,
//         get() {
//             const fechaNacimiento = this.getDataValue('fechaNacimiento');
//             if (fechaNacimiento) {
//                 const hoy = new Date();
//                 const nacimiento = new Date(fechaNacimiento);
//                 let edad = hoy.getFullYear() - nacimiento.getFullYear();
//                 const mes = hoy.getMonth() - nacimiento.getMonth();
//                 if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
//                     edad--;
//                 }
//                 return edad;
//             }
//             return null;
//         }
//     },
//     sexo: { type: DataTypes.STRING, allowNull: false },
//     telefono: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: true },
//     escuela: { type: DataTypes.STRING, allowNull: true },
//     carrera: { type: DataTypes.STRING, allowNull: true },
//     domicilio: { type: DataTypes.STRING, allowNull: true },
//     noBoleta: { type: DataTypes.STRING, allowNull: true },
//     turno: { type: DataTypes.STRING, allowNull: true },
//     fechaRegistro: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
//     estadoCivil: { type: DataTypes.STRING, allowNull: true },
//     ocupacion: { type: DataTypes.STRING, allowNull: true },
//     tipoSangre: { type: DataTypes.STRING, allowNull: true },
//     motivoVisita: { type: DataTypes.TEXT, allowNull: true },
//     padecimientoActual: { type: DataTypes.TEXT, allowNull: true }
// });

// module.exports = Paciente;

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Paciente = sequelize.define('Paciente', {
//     nombre: { type: DataTypes.STRING, allowNull: false },
//     apellidoMaterno: { type: DataTypes.STRING, allowNull: false },
//     apellidoPaterno: { type: DataTypes.STRING, allowNull: false },
//     fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: false },
//     edad: { type: DataTypes.VIRTUAL, get() { return Math.floor((new Date() - this.fechaNacimiento) / (365.25 * 24 * 60 * 60 * 1000)); } },
//     sexo: { type: DataTypes.STRING, allowNull: false },
//     telefono: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: true },
//     escuela: { type: DataTypes.STRING, allowNull: true },
//     carrera: { type: DataTypes.STRING, allowNull: true },
//     domicilio: { type: DataTypes.STRING, allowNull: true },
//     noBoleta: { type: DataTypes.STRING, allowNull: true },
//     turno: { type: DataTypes.STRING, allowNull: true },
//     fechaRegistro: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
//     estadoCivil: { type: DataTypes.STRING, allowNull: true },
//     ocupacion: { type: DataTypes.STRING, allowNull: true },
//     tipoSangre: { type: DataTypes.STRING, allowNull: true },
//     motivoVisita: { type: DataTypes.TEXT, allowNull: true },
//     padecimientoActual: { type: DataTypes.TEXT, allowNull: true }
// });

// module.exports = Paciente;
