// models/AntecHeredofam
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AntecHeredofam = sequelize.define('AntecHeredofam', {
    id_antec: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    alerg: { type: DataTypes.STRING(50), allowNull: true },
    cardiologicos: { type: DataTypes.STRING(50), allowNull: true },
    diabetes: { type: DataTypes.STRING(50), allowNull: true },
    cancer: { type: DataTypes.STRING(50), allowNull: true },
    obesidad: { type: DataTypes.STRING(50), allowNull: true },
    renales: { type: DataTypes.STRING(50), allowNull: true },
    hipertension: { type: DataTypes.STRING(50), allowNull: true },
    anemia: { type: DataTypes.STRING(50), allowNull: true },
    desordenes_aux: { type: DataTypes.STRING(50), allowNull: true },
    hepatobiliares: { type: DataTypes.STRING(50), allowNull: true },
    dislipidimias: { type: DataTypes.STRING(50), allowNull: true },
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
    tableName: 'AntecHeredofam',
    timestamps: false
});

module.exports = AntecHeredofam;
