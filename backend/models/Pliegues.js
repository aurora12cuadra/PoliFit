// models/Pliegues.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pliegues = sequelize.define('Pliegues', {
    id_plie: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    subescapular: { type: DataTypes.STRING(50) },
    triceps: { type: DataTypes.STRING(50) },
    biceps: { type: DataTypes.STRING(50) },
    cresta_iliaca: { type: DataTypes.STRING(50) },
    supraespinal: { type: DataTypes.STRING(50) },
    abdominal: { type: DataTypes.STRING(50) },
    muslo_frontal: { type: DataTypes.STRING(50) },
    pantorrilla_medial: { type: DataTypes.STRING(50) },
    axilar_medial: { type: DataTypes.STRING(50) },
    pectoral: { type: DataTypes.STRING(50) },
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'pliegues'
});

module.exports = Pliegues;

