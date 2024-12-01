const Counter = require('../models/Counter'); // Ruta ajustada al archivo del modelo

async function generateAutoIncrementCode(counterName) {
    try {
        // Encuentra el contador por nombre y actualiza su secuencia
        const counter = await Counter.findOneAndUpdate(
            { name: counterName }, // Nombre del contador
            { $inc: { seq: 1 } }, // Incrementa la secuencia
            { new: true, upsert: true } // Crea el contador si no existe
        );

        // Formatea el código en formato A000
        const formattedCode = `${counterName}${counter.seq.toString().padStart(3, '0')}`;

        return formattedCode;
    } catch (error) {
        console.error('Error al generar el código:', error);
        throw error;
    }
}

module.exports = generateAutoIncrementCode;
