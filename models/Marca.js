const mongoose = require('mongoose');

const MarcaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    observacion: { type: String, default: '' },
  
});

module.exports = mongoose.model('Marca', MarcaSchema);