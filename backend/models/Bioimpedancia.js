// models/Bioimpedancia.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bioimpedancia = sequelize.define('Bioimpedancia', {
    id_bio: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    grasa_total: { type: DataTypes.STRING(50) },
    grasa_secsuper: { type: DataTypes.STRING(50) },
    grasa_secinfe: { type: DataTypes.STRING(50) },
    grasa_visceral: { type: DataTypes.STRING(50) },
    masa_libregrasa: { type: DataTypes.STRING(50) },
    masa_muscular: { type: DataTypes.STRING(50) },
    peso_oseo: { type: DataTypes.STRING(50) },
    agua_corporal: { type: DataTypes.STRING(50) },
    edad_meta: { type: DataTypes.STRING(50) },
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'bioimpedancia'
});

module.exports = Bioimpedancia;

