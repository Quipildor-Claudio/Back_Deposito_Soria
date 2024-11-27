const mongoose = require('mongoose');


// FAMILIA
const tipoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    observacion:{type:String}
    // Add other fields as needed
});

const Tipo = mongoose.model('Tipo', tipoSchema);

module.exports = Tipo;
