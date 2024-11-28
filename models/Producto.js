const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number,default: 0 },
    stock: { type: Number, required: true, default: 0 },
    observation: { type: String, default: '' },
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

module.exports = mongoose.model('Producto', ProductoSchema);