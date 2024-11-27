const mongoose = require('mongoose');

const MovementSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  type: { type: String, enum: ['IN', 'OUT'], required: true }, // IN: ingreso, OUT: egreso
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Movement', MovementSchema);