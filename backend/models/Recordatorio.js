// models/Recordatorio.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recordatorio = sequelize.define('Recordatorio', {
    id_recordatorio: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    // Desayuno
    desayuno_hora: { type: DataTypes.STRING(50) },
    desayuno_lugar: { type: DataTypes.STRING(50) },
    desayuno_descripcion: { type: DataTypes.STRING(50) },

    // Comida
    comida_hora: { type: DataTypes.STRING(50) },
    comida_lugar: { type: DataTypes.STRING(50) },
    comida_descripcion: { type: DataTypes.STRING(50) },

    // Cena
    cena_hora: { type: DataTypes.STRING(50) },
    cena_lugar: { type: DataTypes.STRING(50) },
    cena_descripcion: { type: DataTypes.STRING(50) },

    // Colación 1
    colacion_1_hora: { type: DataTypes.STRING(50) },
    colacion_1_lugar: { type: DataTypes.STRING(50) },
    colacion_1_descripcion: { type: DataTypes.STRING(50) },

    // Colación 2
    colacion_2_hora: { type: DataTypes.STRING(50) },
    colacion_2_lugar: { type: DataTypes.STRING(50) },
    colacion_2_descripcion: { type: DataTypes.STRING(50) },

    // Relación con consulta
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'recordatorio'
});

module.exports = Recordatorio;

