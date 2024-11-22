// models/AntecPerPat.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AntecPerPat = sequelize.define('AntecPerPat', {
    id_pat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    alergias: { type: DataTypes.STRING(50), allowNull: true },
    cadiologicos: { type: DataTypes.STRING(50), allowNull: true },
    diabetes: { type: DataTypes.STRING(50), allowNull: true },
    cancer: { type: DataTypes.STRING(50), allowNull: true },
    cirugias: { type: DataTypes.STRING(50), allowNull: true },
    obesidad: { type: DataTypes.STRING(50), allowNull: true },
    renales: { type: DataTypes.STRING(50), allowNull: true },
    hipertension: { type: DataTypes.STRING(50), allowNull: true },
    anemia: { type: DataTypes.STRING(50), allowNull: true },
    tiroides: { type: DataTypes.STRING(50), allowNull: true },
    desordenes_aux: { type: DataTypes.STRING(50), allowNull: true },
    hepatobiliares: { type: DataTypes.STRING(50), allowNull: true },
    dislipidimias: { type: DataTypes.STRING(50), allowNull: true },
    hepatitis: { type: DataTypes.STRING(50), allowNull: true },
    otros: { type: DataTypes.STRING(50), allowNull: true },
    noBoleta: {
        type: DataTypes.STRING(60),
        allowNull: false,
        references: {
            model: 'Pacientes',
            key: 'noBoleta'
        }
    }
}, {
    tableName: 'AntecPerPat',
    timestamps: false
});

module.exports = AntecPerPat;
