// models/TransGastro.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TransGastro = sequelize.define('TransGastro', {
    id_transgastro: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    vomito: { type: DataTypes.STRING(50) },
    diarrea: { type: DataTypes.STRING(50) },
    estreni: { type: DataTypes.STRING(50) },
    colitis: { type: DataTypes.STRING(50) },
    gastri: { type: DataTypes.STRING(50) },
    nauseas: { type: DataTypes.STRING(50) },
    reflujo: { type: DataTypes.STRING(50) },
    disfagia: { type: DataTypes.STRING(50) },
    flatulen: { type: DataTypes.STRING(50) },
    disten: { type: DataTypes.STRING(50) },
    pirosis: { type: DataTypes.STRING(60) },
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'trans_gastro'
});

module.exports = TransGastro;

