// app.js
const express = require('express');
const app = express();
const nutriologosRoutes = require('./routes/nutriologos');
const pacientesRoutes = require('./routes/pacientes');
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); 
const antecedentesRoutes = require('./routes/antecedentes');
const consultaRoutes = require('./routes/consultas');
const citasRoutes = require('./routes/citas');
const cors = require('cors');
const pacienteAntecedentesRoutes = require('./routes/pacienteAntecedentesRoutes');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/nutriologos', nutriologosRoutes);
//app.use('/pacientes', pacientesRoutes);
app.use('/antecedentes', antecedentesRoutes);
app.use('/consulta', consultaRoutes);
app.use('/citas', citasRoutes);
app.use('/paciente', pacienteAntecedentesRoutes);
app.use(cors());

// app.listen(3000, () => {
//     console.log('Servidor corriendo en http://localhost:3000');
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//alter: true //sobreeescribe la bd
//force: false //crea cada vez la bd 
sequelize.sync({ alter: true }).then(() => {
    console.log('Base de datos sincronizada');
}).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});



// const express = require('express');
// const app = express();
// const nutriologosRoutes = require('./routes/nutriologos');
// const pacientesRoutes = require('./routes/pacientes');

// app.use(express.json());
// app.use('/nutriologos', nutriologosRoutes);
// app.use('/pacientes', pacientesRoutes);

// app.listen(3000, () => {
//     console.log('Servidor corriendo en http://localhost:3000');
// });

// const sequelize = require('./config/database');

// sequelize.sync({ force: true }).then(() => {
//     console.log('Base de datos sincronizada');
// }).catch((error) => {
//     console.error('Error al sincronizar la base de datos:', error);
// });