// models/Recordatorio.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recordatorio = sequelize.define('Recordatorio', {
    id_recordatorio: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hora: { type: DataTypes.TIME },
    lugar: { type: DataTypes.STRING(50) },
    descripcion: { type: DataTypes.STRING(50) },
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'recordatorio'
});

module.exports = Recordatorio;
