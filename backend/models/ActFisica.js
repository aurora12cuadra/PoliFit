// models/ActFisica.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ActFisica = sequelize.define('ActFisica', {
    id_actfisica: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tipo: { type: DataTypes.STRING(60), allowNull: false },
    frecuencia: { type: DataTypes.STRING(60), allowNull: false },
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'act_fisica'
});

module.exports = ActFisica;

