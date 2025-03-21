const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mass: { type: Number, required: true }, // У масах Землі
    radius: { type: Number, required: true }, // У радіусах Землі
    distanceFromSun: { type: Number, required: true }, // В астрономічних одиницях
    type: { type: String, enum: ["terrestrial", "gas giant", "ice giant", "dwarf"], required: true }
});

module.exports = mongoose.model("Planet", planetSchema);
