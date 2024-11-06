// models/Bioquimicos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bioquimicos = sequelize.define('Bioquimicos', {
    id_bioqui: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    homoglobina: { type: DataTypes.STRING(50) },
    glucosa: { type: DataTypes.STRING(50) },
    colesterol: { type: DataTypes.STRING(50) },
    trigliceridos: { type: DataTypes.STRING(50) },
    urea: { type: DataTypes.STRING(50) },
    acido_urico: { type: DataTypes.STRING(50) },
    albumina: { type: DataTypes.STRING(50) },
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'bioquimicos'
});

module.exports = Bioquimicos;
