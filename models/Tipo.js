const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    // Add other fields as needed
});

const Tipo = mongoose.model('Tipo', tipoSchema);

module.exports = Tipo;
