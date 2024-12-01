const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Nombre del contador
    seq: { type: Number, default: 0 }, // Valor inicial del contador
});
const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter; // Asegúrate de exportar el modelo
