require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRouter');
const serviceRoutes = require('./routes/serviceRoutes');
const tipoRoutes = require('./routes/tipoRouter');



// Conexión a la base de datos
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/auth', authRoutes);
app.use(roleRoutes);
app.use(serviceRoutes);
app.use(tipoRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));