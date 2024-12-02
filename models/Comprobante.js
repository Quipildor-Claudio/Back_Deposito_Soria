const mongoose = require('mongoose');

const ComprobanteSchema = new mongoose.Schema({
    product: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        observation: String,
        min: Number,
        tipo: {
          _id: mongoose.Schema.Types.ObjectId,
          name: String,
          observacion: String,
        },
        unidad: {
          _id: mongoose.Schema.Types.ObjectId,
          name: String,
          observacion: String,
        },
      },
    cantidad: { type: Number, default: 0 },
});
const Comprobante = mongoose.model('Comprobante', ComprobanteSchema);
module.exports = Comprobante;