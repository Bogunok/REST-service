const mongoose = require("mongoose");

const starSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // Наприклад, "G-type main-sequence" для Сонця
    mass: { type: Number, required: true }, // У масах Сонця
    radius: { type: Number, required: true }, // У радіусах Сонця
    distanceFromEarth: { type: Number, required: true } // в астрономічних одиницях
});

module.exports = mongoose.model("Star", starSchema);
