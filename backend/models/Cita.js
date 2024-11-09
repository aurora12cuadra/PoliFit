const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta según tu configuración

class Cita extends Model {}

Cita.init(
  {
    id_citas: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    fecha_consulta: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    hora_consulta: { type: DataTypes.TIME, defaultValue: DataTypes.NOW },
    numeroEmpleado: {
        type: DataTypes.STRING(60),
        allowNull: false,
        references: {
            model: 'Nutriologos', // Nombre de la tabla de nutriólogos
            key: 'numeroEmpleado'
        }
    },
    noBoleta: {
        type: DataTypes.STRING(60),
        allowNull: false,
        references: {
            model: 'Pacientes',
            key: 'noBoleta'
        }
    },
  },
  {
    tableName: 'citas'
  }
);

module.exports = Cita;
