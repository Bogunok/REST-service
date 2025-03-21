const express = require("express");
const planetController = require("../controllers/planetController");

const router = express.Router();

router.get("/", planetController.getAll);
router.get("/:id", planetController.getById);
router.post("/", planetController.create);
router.put("/:id", planetController.update);
router.delete("/:id", planetController.delete);

module.exports = router;
