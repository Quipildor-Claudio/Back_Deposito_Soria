const mongoose = require('mongoose');
const generateAutoIncrementCode = require('../controllers/counterController'); // Función del código

const ProductoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    observation: { type: String, default: '' },
    code: { type: String, default: '' },
    min: { type: Number, default: 0 }, //stock minimo
    marca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marca', // Referencing the Role model
    },
    tipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tipo', // Referencing the Role model
    },
    unidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UnidadMedida', // Referencing the Role model
    },
},
    { timestamps: true }
);
// Middleware pre-save para generar el código automáticamente
ProductoSchema.pre('save', async function (next) {
    if (!this.code) {
        this.code = await generateAutoIncrementCode('A'); // Genera el código camviar por el codigo de talonario
    }
    next();
});
const Producto = mongoose.model('Producto', ProductoSchema);
module.exports = Producto;