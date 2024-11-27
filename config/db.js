const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Salir del proceso en caso de error
  }
};

module.exports = connectDB;
