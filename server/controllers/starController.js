const starService = require("../services/starService");

class StarController {
    async getAll(req, res) {
        try {
            const stars = await starService.getAll();
            res.json(stars);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getById(req, res) {
        try {
            const star = await starService.getById(req.params.id);
            if (!star) return res.status(404).json({ message: "Зірка не знайдена" });
            res.json(star);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async create(req, res) {
        try {
            const star = await starService.create(req.body);
            res.status(201).json(star);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async update(req, res) {
        try {
            const star = await starService.update(req.params.id, req.body);
            if (!star) return res.status(404).json({ message: "Зірка не знайдена" });
            res.json(star);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async delete(req, res) {
        try {
            const star = await starService.delete(req.params.id);
            if (!star) return res.status(404).json({ message: "Зірка не знайдена" });
            res.json({ message: "Зірка видалена" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new StarController();
