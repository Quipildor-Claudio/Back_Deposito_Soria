const mongoose = require('mongoose');

const ComprobanteSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

module.exports = mongoose.model('Comprobante', ComprobanteSchema);