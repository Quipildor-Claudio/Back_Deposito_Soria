const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateAutoIncrementCode = require('../controllers/counterController'); // Función del código

const MovementSchema = new mongoose.Schema({

  comprobantes: [{
    product: {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      observation: String,
      min: Number,
      stock: Number,
      price: Number,
      code: String,
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
  }],
  type: { type: String, enum: ['IN', 'OUT'], required: true }, // IN: ingreso, OUT: egreso
  date: {
    type: String, // Guardaremos la fecha como un string en formato YYYY-MM-DD
    required: true,
    default: () => new Date().toISOString().split('T')[0], // Solo la parte de la fecha
  },
  hora: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  observacion: { type: String, default: '' },
  code: { type: String, default: '' },
  remito: { type: String, default: '' },
  proveedor: { type: String, default: '' },
  compra: { type: String, default: '' },
  expediente: { type: String, default: '' },
  total: { type: Number, default: 0 },
});

// Middleware pre-save para generar el código automáticamente
MovementSchema.pre('save', async function (next) {
  if (!this.code) {
    this.code = await generateAutoIncrementCode('M'); // Genera el código
  }
  next();
});



MovementSchema.statics.findByService = async function(serviceIdOrName) {
  try {
    const movements = await this.find({
      $or: [
        { service: mongoose.Types.ObjectId(serviceIdOrName) }, // Si se pasa el `serviceId` (ObjectId)
        { 'service.name': { $regex: serviceIdOrName, $options: 'i' } } // Si se pasa el `service.name` (cadena)
      ]
    });

    return movements;
  } catch (error) {
    throw new Error('Error al realizar la búsqueda por servicio: ' + error.message);
  }
};



const Movement = mongoose.model('Movement', MovementSchema);

module.exports = Movement; // Asegúrate de exportar el modelo
