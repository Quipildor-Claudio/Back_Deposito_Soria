const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    observacion: {
        type: String,
    },
    // Add other fields as needed
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
