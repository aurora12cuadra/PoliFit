// models/Nutriologo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Nutriologo = sequelize.define('Nutriologo', {
    numeroEmpleado: { type: DataTypes.STRING(60), primaryKey: true },
    nombre: { type: DataTypes.STRING(60), allowNull: false },
    apellidos: { type: DataTypes.STRING(60), allowNull: false },
    fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: false },
    especialidad: { type: DataTypes.STRING(60), allowNull: false },
    escuela: { type: DataTypes.STRING(60), allowNull: false },
    email: { type: DataTypes.STRING(70), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(70), allowNull: false },
    resetToken: { type: DataTypes.STRING(100), allowNull: true }, // Token para restablecer contraseña
    resetTokenExpiration: { type: DataTypes.DATE, allowNull: true }, // Expiración del token
});

// Cifrar la contraseña antes de guardar
Nutriologo.beforeCreate(async (nutriologo) => {
    const salt = await bcrypt.genSalt(10);
    nutriologo.password = await bcrypt.hash(nutriologo.password, salt);
});

module.exports = Nutriologo;

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const bcrypt = require('bcrypt');

// const Nutriologo = sequelize.define('Nutriologo', {
//     nombre: { type: DataTypes.STRING, allowNull: false },
//     apellidos: { type: DataTypes.STRING, allowNull: false },
//     fechaNacimiento: { type: DataTypes.DATE, allowNull: false },
//     numeroEmpleado: { type: DataTypes.STRING, allowNull: false },
//     especialidad: { type: DataTypes.STRING },
//     escuela: { type: DataTypes.STRING },
//     email: { type: DataTypes.STRING, allowNull: false, unique: true },
//     password: { type: DataTypes.STRING, allowNull: false }
// });

// // Cifrar la contraseña antes de guardar
// Nutriologo.beforeCreate(async (nutriologo) => {
//     const salt = await bcrypt.genSalt(10);
//     nutriologo.password = await bcrypt.hash(nutriologo.password, salt);
// });

// module.exports = Nutriologo;

/* const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Nutriologo = sequelize.define('Nutriologo', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellidos: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    cedulaProfesional: { type: DataTypes.STRING, allowNull: false },
    profesion: { type: DataTypes.STRING },
    especialidad: { type: DataTypes.STRING },
});

module.exports = Nutriologo; */

