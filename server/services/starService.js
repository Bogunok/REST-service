const starDao = require("../dao/starDao");

class StarService {
    async getAll() {
        return await starDao.getAll();
    }

    async getById(id) {
        return await starDao.getById(id);
    }

    async create(data) {
        return await starDao.create(data);
    }

    async update(id, data) {
        return await starDao.update(id, data);
    }

    async delete(id) {
        return await starDao.delete(id);
    }
}

module.exports = new StarService();
