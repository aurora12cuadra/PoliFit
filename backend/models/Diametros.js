// models/Diametros.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Diametros = sequelize.define('Diametros', {
    id_dia: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    biacromial: { type: DataTypes.STRING(50) },
    biileocrestal: { type: DataTypes.STRING(50) },
    long_pie: { type: DataTypes.STRING(50) },
    trans_torax: { type: DataTypes.STRING(50) },
    ante_torax: { type: DataTypes.STRING(50) },
    humero: { type: DataTypes.STRING(50) },
    bies_muñeca: { type: DataTypes.STRING(50) },
    femur: { type: DataTypes.STRING(50) },
    bimaleolar: { type: DataTypes.STRING(50) },
    trans_pie: { type: DataTypes.STRING(50) },
    long_mano: { type: DataTypes.STRING(50) },
    trans_mano: { type: DataTypes.STRING(50) },
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'diametros'
});

module.exports = Diametros;

