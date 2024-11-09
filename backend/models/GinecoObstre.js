// models/GinecoObstre.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Consulta = require('./Consulta');

const GinecoObstre = sequelize.define('GinecoObstre', {
    id_gineobstre: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    g: { type: DataTypes.STRING(50) },
    p: { type: DataTypes.STRING(50) },
    c: { type: DataTypes.STRING(50) },
    fum: { type: DataTypes.STRING(50) },
    fup: { type: DataTypes.STRING(50) },
    sdgi: { type: DataTypes.STRING(50) },
    ppg: { type: DataTypes.STRING(50) },
    anticon: { type: DataTypes.STRING(50) },
    id_consulta: {
        type: DataTypes.INTEGER,
        references: { model: Consulta, key: 'id_consulta' }
    }
}, {
    tableName: 'gineco_obstre'
});

module.exports = GinecoObstre;
