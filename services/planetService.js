const planetDao = require("../dao/planetDao");

class PlanetService {
    async getAll() {
        return await planetDao.getAll();
    }

    async getById(id) {
        return await planetDao.getById(id);
    }

    async create(data) {
        return await planetDao.create(data);
    }

    async update(id, data) {
        return await planetDao.update(id, data);
    }

    async delete(id) {
        return await planetDao.delete(id);
    }
}

module.exports = new PlanetService();
