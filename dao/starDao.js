const Star = require("../models/starModel");

class StarDao {
    async getAll() {
        return await Star.find();
    }

    async getById(id) {
        return await Star.findById(id);
    }

    async create(data) {
        const star = new Star(data);
        return await star.save();
    }

    async update(id, data) {
        return await Star.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Star.findByIdAndDelete(id);
    }
}

module.exports = new StarDao();
