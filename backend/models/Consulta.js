// models/Consulta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Consulta = sequelize.define('Consulta', {
    id_consulta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    numeroEmpleado: {
        type: DataTypes.STRING(60),
        allowNull: false,
        references: {
            model: 'Nutriologos', // Nombre de la tabla de nutriólogos
            key: 'numeroEmpleado'
        }
    },
    noBoleta: {
        type: DataTypes.STRING(60),
        allowNull: false,
        references: {
            model: 'Pacientes',
            key: 'noBoleta'
        }
    },
    fecha_consulta: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    hora_consulta: { type: DataTypes.TIME, defaultValue: DataTypes.NOW },
}, {
    tableName: 'consulta'
});

module.exports = Consulta;
