const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: {
        type: String,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: false, // Set default value to true or false as per your requirement
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service', // Referencing the Service model
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Referencing the Role model
    },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
