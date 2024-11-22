const sequelize = require('../config/database');
const Nutriologo = require('./Nutriologo');
const Paciente = require('./Paciente');
const AntecHeredofam = require('./AntecHeredofam');
const AntecPerPat = require('./AntecPerPat');
const Consulta = require('./Consulta');
const ActLaboral = require('./ActLaboral');
const ActFisica = require('./ActFisica');
const Toxicomanias = require('./Toxicomanias');
const HabitosDiet = require('./HabitosDiet');
const TransGastro = require('./TransGastro');
const GinecoObstre = require('./GinecoObstre');
const Pliegues = require('./Pliegues');
const Perimetros = require('./Perimetros');
const Diametros = require('./Diametros');
const Bioimpedancia = require('./Bioimpedancia');
const Bioquimicos = require('./Bioquimicos');
const Kilocalorias = require('./Kilocalorias');
const Recordatorio = require('./Recordatorio');

// Define las asociaciones
Consulta.hasOne(ActLaboral, { foreignKey: 'id_consulta' });
Consulta.hasOne(ActFisica, { foreignKey: 'id_consulta' });
Consulta.hasOne(Toxicomanias, { foreignKey: 'id_consulta' });
Consulta.hasOne(HabitosDiet, { foreignKey: 'id_consulta' });
Consulta.hasOne(TransGastro, { foreignKey: 'id_consulta' });
Consulta.hasOne(GinecoObstre, { foreignKey: 'id_consulta' });
Consulta.hasOne(Pliegues, { foreignKey: 'id_consulta' });
Consulta.hasOne(Perimetros, { foreignKey: 'id_consulta' });
Consulta.hasOne(Diametros, { foreignKey: 'id_consulta' });
Consulta.hasOne(Bioimpedancia, { foreignKey: 'id_consulta' });
Consulta.hasOne(Bioquimicos, { foreignKey: 'id_consulta' });
Consulta.hasOne(Kilocalorias, { foreignKey: 'id_consulta' });
Consulta.hasOne(Recordatorio, { foreignKey: 'id_consulta' });

ActLaboral.belongsTo(Consulta, { foreignKey: 'id_consulta' });
ActFisica.belongsTo(Consulta, { foreignKey: 'id_consulta' });
Toxicomanias.belongsTo(Consulta, { foreignKey: 'id_consulta' });
HabitosDiet.belongsTo(Consulta, { foreignKey: 'id_consulta' });
TransGastro.belongsTo(Consulta, { foreignKey: 'id_consulta' });
GinecoObstre.belongsTo(Consulta, { foreignKey: 'id_consulta' });
Pliegues.belongsTo(Consulta, { foreignKey: 'id_consulta' });
Perimetros.belongsTo(Consulta, { foreignKey: 'id_consulta' });
Diametros.belongsTo(Consulta, { foreignKey: 'id_consulta' });
Bioimpedancia.belongsTo(Consulta, { foreignKey: 'id_consulta' });
Bioquimicos.belongsTo(Consulta, { foreignKey: 'id_consulta' });
Kilocalorias.belongsTo(Consulta, { foreignKey: 'id_consulta' });
Recordatorio.belongsTo(Consulta, { foreignKey: 'id_consulta' });

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
    AntecPerPat,
    Consulta,
    ActLaboral,
    ActFisica,
    Toxicomanias,
    HabitosDiet,
    TransGastro,
    GinecoObstre,
    Pliegues,
    Perimetros,
    Diametros,
    Bioimpedancia,
    Bioquimicos,
    Kilocalorias,
    Recordatorio
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
