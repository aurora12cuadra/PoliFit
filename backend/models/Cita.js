// models/Cita.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cita = sequelize.define('Cita', {
    idCita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_citas'
    },
    nombre: { type: DataTypes.STRING(200)},
    fecha_consulta: { type: DataTypes.STRING(60) },
    hora_consulta: { type: DataTypes.TIME, defaultValue: DataTypes.NOW },
    numeroEmpleado: {
        type: DataTypes.STRING(60),
        allowNull: false,
        references: {
            model: 'Nutriologos', // Nombre de la tabla de nutriólogos
            key: 'numeroEmpleado'
        }
    },
    // noBoleta: {
    //     type: DataTypes.STRING(60),
    //     allowNull: false,
    //     references: {
    //         model: 'Pacientes',
    //         key: 'noBoleta'
    //     }
    // },
}, {
    tableName: 'citas',
    timestamps: false // No incluye createdAt y updatedAt por defecto
});

module.exports = Cita;

