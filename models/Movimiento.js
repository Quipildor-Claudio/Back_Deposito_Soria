const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateAutoIncrementCode = require('../controllers/counterController'); // Función del código

const MovementSchema = new mongoose.Schema({
  products:[{
    type: Schema.Types.ObjectId, ref: 'Producto' 
  }],
  type: { type: String, enum: ['IN', 'OUT'], required: true }, // IN: ingreso, OUT: egreso
  date: { type: Date, default: Date.now },
  hora:{type:String},
  user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cod:{type:String},
  service:{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  observacion:{type:String},
  code:{type:String}
});

// Middleware pre-save para generar el código automáticamente
MovementSchema.pre('save', async function (next) {
  if (!this.code) {
    this.code = await generateAutoIncrementCode('M'); // Genera el código
  }
  next();
});

const Movement = mongoose.model('Movement', MovementSchema);

module.exports = Movement; // Asegúrate de exportar el modelo
