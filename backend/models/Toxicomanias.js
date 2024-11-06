// models/Toxicomanias.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Toxicomanias = sequelize.define('Toxicomanias', {
    id_tax: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    alcohol: { type: DataTypes.STRING(50) },
    tabaco: { type: DataTypes.STRING(50) },
    cafe: { type: DataTypes.STRING(50) },
    farmacodep: { type: DataTypes.STRING(50) },
    medicamentos: { type: DataTypes.STRING(50) },
    otro: { type: DataTypes.STRING(50) },
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'toxicomanias'
});

module.exports = Toxicomanias;

