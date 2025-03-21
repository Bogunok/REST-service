const Planet = require("../models/planetModel");

class PlanetDao {
    async getAll() {
        return await Planet.find();
    }

    async getById(id) {
        return await Planet.findById(id);
    }

    async create(data) {
        return await new Planet(data).save();
    }

    async update(id, data) {
        return await Planet.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Planet.findByIdAndDelete(id);
    }
}

module.exports = new PlanetDao();
