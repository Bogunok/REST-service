const planetService = require("../services/planetService");

class PlanetController {
    async getAll(req, res) {
        res.json(await planetService.getAll());
    }

    async getById(req, res) {
        const planet = await planetService.getById(req.params.id);
        planet ? res.json(planet) : res.status(404).json({ message: "Планета не знайдена" });
    }

    async create(req, res) {
        res.status(201).json(await planetService.create(req.body));
    }

    async update(req, res) {
        const planet = await planetService.update(req.params.id, req.body);
        planet ? res.json(planet) : res.status(404).json({ message: "Планета не знайдена" });
    }

    async delete(req, res) {
        const planet = await planetService.delete(req.params.id);
        planet ? res.json({ message: "Планета видалена" }) : res.status(404).json({ message: "Планета не знайдена" });
    }
}

module.exports = new PlanetController();
