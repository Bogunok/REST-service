const Planet = require("../models/planetModel");

class PlanetDao {
    async getAll() {
        return await Planet.find({}, "_id name type mass radius distanceFromSun");
    }

    async getById(id) {
        return Planet.findById(id);
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
