const sequelize = require('../config/database');
const Nutriologo = require('./Nutriologo');
const Paciente = require('./Paciente');
const AntecHeredofam = require('./AntecHeredofam');
const AntecPerPat = require('./AntecPerPat');

// Definir asociaciones
Nutriologo.hasMany(Paciente, { foreignKey: 'numeroEmpleado', onDelete: 'CASCADE' });
Paciente.belongsTo(Nutriologo, { foreignKey: 'numeroEmpleado' });

Paciente.hasOne(AntecHeredofam, { foreignKey: 'noBoleta', onDelete: 'CASCADE' });
AntecHeredofam.belongsTo(Paciente, { foreignKey: 'noBoleta' });

Paciente.hasOne(AntecPerPat, { foreignKey: 'noBoleta', onDelete: 'CASCADE' });
AntecPerPat.belongsTo(Paciente, { foreignKey: 'noBoleta' });

module.exports = {
    sequelize,
    Nutriologo,
    Paciente,
    AntecHeredofam,
    AntecPerPat
};


// Paciente.hasMany(ActLaboral, { foreignKey: 'num_boleta', onDelete: 'CASCADE' });
// ActLaboral.belongsTo(Paciente, { foreignKey: 'num_boleta' });


// // models/Index.js
// const sequelize = require('../config/database');
// const Nutriologo = require('./Nutriologo');
// const Paciente = require('./Paciente');

// // Definir asociaciones
// Nutriologo.hasMany(Paciente, { foreignKey: 'numeroEmpleado', onDelete: 'CASCADE' });
// Paciente.belongsTo(Nutriologo, { foreignKey: 'numeroEmpleado' });

// module.exports = {
//     sequelize,
//     Nutriologo,
//     Paciente
// };
