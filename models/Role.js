const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    // Add other fields as needed
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
