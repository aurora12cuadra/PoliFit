// models/Kilocalorias.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ActFisica = require('./ActFisica');

const Kilocalorias = sequelize.define('Kilocalorias', {
    id_kilo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    peso: { type: DataTypes.FLOAT, allowNull: false },
    altura: { type: DataTypes.FLOAT, allowNull: false },
    imc: { type: DataTypes.FLOAT }, // Calculado automáticamente
    objetivoPeso: { type: DataTypes.STRING(20) }, // "aumentar peso", "mantener peso", o "disminuir peso"
    formula: { type: DataTypes.STRING(50), allowNull: false }, // Nombre de la fórmula elegida
    tmb: { type: DataTypes.FLOAT }, // Calculado con la fórmula seleccionada
    af: { type: DataTypes.FLOAT }, // Factor de actividad física
    eta: { type: DataTypes.FLOAT }, // Energía Total Asignada (TMB * AF)
    hc: { type: DataTypes.FLOAT }, // Hidratos de Carbono (40% de ETA)
    prot: { type: DataTypes.FLOAT }, // Proteínas (30% de ETA)
    lp: { type: DataTypes.FLOAT }, // Lípidos (30% de ETA)
    id_consulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'consulta', key: 'id_consulta' }
    }
}, {
    tableName: 'kilocalorias',
    timestamps: false,
    hooks: {
        beforeCreate: async (kilocalorias) => {
            // Calcular el IMC
            kilocalorias.imc = kilocalorias.peso / (kilocalorias.altura ** 2);

            // Determinar el objetivo de peso según el IMC
            if (kilocalorias.imc < 18.5) {
                kilocalorias.objetivoPeso = "aumentar peso";
            } else if (kilocalorias.imc <= 24.9) {
                kilocalorias.objetivoPeso = "mantener peso";
            } else {
                kilocalorias.objetivoPeso = "disminuir peso";
            }

            // Calcular el TMB basado en la fórmula seleccionada
            kilocalorias.tmb = calculateTMB(kilocalorias.formula, kilocalorias.peso, kilocalorias.altura);

            // Ajustar el TMB según el objetivo de peso
            if (kilocalorias.objetivoPeso === "aumentar peso") {
                kilocalorias.tmb += 500;
            } else if (kilocalorias.objetivoPeso === "disminuir peso") {
                kilocalorias.tmb -= 500;
            }

            // Recuperar el factor de actividad física (AF) de ActFisica
            const actFisica = await ActFisica.findOne({ where: { id_consulta: kilocalorias.id_consulta } });
            kilocalorias.af = actFisica ? actFisica.frecuencia : 1; // Usar 1 si no se encuentra

            // Calcular ETA (TMB * AF)
            kilocalorias.eta = kilocalorias.tmb * kilocalorias.af;

            // Distribuir la ETA en 40% HC, 30% Proteínas, y 30% Lípidos
            kilocalorias.hc = kilocalorias.eta * 0.4;
            kilocalorias.prot = kilocalorias.eta * 0.3;
            kilocalorias.lp = kilocalorias.eta * 0.3;
        }
    }
});

// Función para calcular el TMB usando diferentes fórmulas
function calculateTMB(formula, peso, altura) {
    switch (formula) {
        case 'Harris-Benedict':
            return 88.362 + (13.397 * peso) + (4.799 * altura * 100) - (5.677 * 25); // 25 es la edad aproximada
        case 'Mifflin St. Jeor':
            return (10 * peso) + (6.25 * altura * 100) - (5 * 25) + 5; // Edad y género masculino asumido
        case 'Valencia':
            return (12.1 * peso) + (3.1 * altura * 100) + 10; // Fórmula general
        default:
            throw new Error('Fórmula de TMB no reconocida');
    }
}

module.exports = Kilocalorias;

