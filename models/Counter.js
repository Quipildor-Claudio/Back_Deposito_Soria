const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
    _id: String, // Identificador del contador (por ejemplo, "codigo")
    seq: { type: Number, default: 0 },
});


const Counter = mongoose.model("Counter", counterSchema);
