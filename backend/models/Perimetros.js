// models/Perimetros.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Perimetros = sequelize.define('Perimetros', {
    id_peri: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cefalico: { type: DataTypes.STRING(50) },
    cuello: { type: DataTypes.STRING(50) },
    mitad_bra_rela: { type: DataTypes.STRING(50) },
    mitad_bra_contra: { type: DataTypes.STRING(50) },
    antebrazo: { type: DataTypes.STRING(50) },
    muñeca: { type: DataTypes.STRING(50) },
    mesoesternal: { type: DataTypes.STRING(50) },
    umbilical: { type: DataTypes.STRING(50) },
    cintura: { type: DataTypes.STRING(50) },
    cadera: { type: DataTypes.STRING(50) },
    muslo: { type: DataTypes.STRING(50) },
    muslo_medio: { type: DataTypes.STRING(50) },
    panto: { type: DataTypes.STRING(50) },
    tobillo: { type: DataTypes.STRING(50) },
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'perimetros'
});

module.exports = Perimetros;

