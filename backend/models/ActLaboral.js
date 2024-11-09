// models/ActLaboral.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ActLaboral = sequelize.define('ActLaboral', {
    id_actlaboral: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    horario: { type: DataTypes.STRING(50), allowNull: false },
    ocupacion: { type: DataTypes.STRING(70), allowNull: false },
    descrip: { type: DataTypes.STRING(100), allowNull: false },
    total_horas: { type: DataTypes.STRING(70), allowNull: false },
    n_estres: { type: DataTypes.INTEGER, allowNull: false },
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'act_laboral'
});

module.exports = ActLaboral;


