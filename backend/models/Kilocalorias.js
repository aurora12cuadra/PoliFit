// models/Kilocalorias.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Kilocalorias = sequelize.define('Kilocalorias', {
    id_kilo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    peso: { type: DataTypes.FLOAT, allowNull: false },
    altura: { type: DataTypes.FLOAT, allowNull: false },
    imc: { type: DataTypes.FLOAT }, // Calculado automáticamente
    objetivo: { type: DataTypes.STRING(20) }, // "aumentar peso", "mantener peso", o "disminuir peso"
    formula: { type: DataTypes.STRING(50), allowNull: false }, // Nombre de la fórmula elegida
    tmb: { type: DataTypes.FLOAT }, // Calculado con la fórmula seleccionada
    af: { type: DataTypes.FLOAT }, // Factor de actividad física
    eta: { type: DataTypes.FLOAT }, // Energía Total Asignada (TMB * AF)
    hc: { type: DataTypes.FLOAT }, // Hidratos de Carbono
    hcPercentage: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 30 }, // Porcentaje de Hidratos de Carbono
    prot: { type: DataTypes.FLOAT }, // Proteínas
    protPercentage: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 40 }, // Porcentaje de Proteínas
    lp: { type: DataTypes.FLOAT }, // Lípidos
    lpPercentage: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 30 }, // Porcentaje de Lípidos
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'kilocalorias',
    timestamps: false,
});

module.exports = Kilocalorias;

