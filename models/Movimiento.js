const mongoose = require('mongoose');
const MovementSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
  type: { type: String, enum: ['IN', 'OUT'], required: true }, // IN: ingreso, OUT: egreso
  quantity: { type: Number, required: true,default:0 },
  date: { type: Date, default: Date.now },
  hora:{type:String},
  user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cod:{type:String}
});

module.exports = mongoose.model('Movement', MovementSchema);