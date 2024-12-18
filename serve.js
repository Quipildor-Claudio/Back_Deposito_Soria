require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRouter');
const serviceRoutes = require('./routes/serviceRoutes');
const tipoRoutes = require('./routes/tipoRouter');
const marcaRoutes = require('./routes/marcaRoute');
const unidadRoutes = require('./routes/unidadMedida');
const productoRoutes = require('./routes/productoRoutes');
const movimientoRoutes = require('./routes/movimientoRoute');
const comprobanteRoutes = require('./routes/comprobanteRoutes');




// Conexión a la base de datos
connectDB();

const app = express();
// Set up CORS
app.use(cors({
    origin: true, // "true" will copy the domain of the request back
                  // to the reply. If you need more control than this
                  // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
                       // authenticated via either a session cookie
                       // or Authorization header. Otherwise the
                       // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                           // pre-flight OPTIONS requests
}));
app.use(bodyParser.json());

// Rutas
app.use('/auth', authRoutes);
app.use(roleRoutes);
app.use(serviceRoutes);
app.use(tipoRoutes);
app.use(marcaRoutes);
app.use(unidadRoutes);
app.use(productoRoutes);
app.use(movimientoRoutes);
app.use(comprobanteRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));