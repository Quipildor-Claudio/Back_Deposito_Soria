const mongoose = require('mongoose');

const unidadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    observacion: { type: String, default: '' },
        // Add other fields as needed
});

const UnidadMedida = mongoose.model('UnidadMedida', unidadSchema);

module.exports = UnidadMedida;
