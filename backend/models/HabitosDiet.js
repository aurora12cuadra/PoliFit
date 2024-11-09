// models/HabitosDiet.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HabitosDiet = sequelize.define('HabitosDiet', {
    habit_diet: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    alimen_ndesead: { type: DataTypes.STRING(50), allowNull: false },
    alimen_fav: { type: DataTypes.STRING(50), allowNull: false },
    alergia: { type: DataTypes.STRING(50), allowNull: false },
    hora_bkf: { type: DataTypes.STRING(50), allowNull: false },
    hora_comida: { type: DataTypes.STRING(50), allowNull: false },
    hora_cena: { type: DataTypes.STRING(50), allowNull: false },
    hora_desp: { type: DataTypes.STRING(50), allowNull: false },
    cant_agua: { type: DataTypes.STRING(50), allowNull: false },
    cant_sal: { type: DataTypes.STRING(50), allowNull: false },
    cant_azu: { type: DataTypes.STRING(50), allowNull: false },
    alimen_nconsum: { type: DataTypes.STRING(50), allowNull: false },
    alimen_into: { type: DataTypes.STRING(50), allowNull: false },
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'habitos_diet'
});

module.exports = HabitosDiet;

