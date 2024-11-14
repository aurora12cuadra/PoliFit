// app.js
const express = require('express');
const app = express();
const nutriologosRoutes = require('./routes/nutriologos');
const pacientesRoutes = require('./routes/pacientes');
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); // Importa la conexión y modelos desde index.js
const antecedentesRoutes = require('./routes/antecedentes');
const consultaRoutes = require('./routes/consultas');
const citasRoutes = require('./routes/citas');
const cors = require('cors');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/nutriologos', nutriologosRoutes);
app.use('/pacientes', pacientesRoutes);
app.use('/antecedentes', antecedentesRoutes);
app.use('/consulta', consultaRoutes);
app.use('/citas', citasRoutes);
app.use(cors());

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

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