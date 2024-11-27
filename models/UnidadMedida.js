const mongoose = require('mongoose');

const unidadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    // Add other fields as needed
});

const UnidadMedida = mongoose.model('UnidadMedida', unidadSchema);

module.exports = UnidadMedida;
