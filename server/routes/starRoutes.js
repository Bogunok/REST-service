const express = require("express");
const starController = require("../controllers/starController");

const router = express.Router();

router.get("/", starController.getAll);
router.get("/:id", starController.getById);
router.post("/", starController.create);
router.put("/:id", starController.update);
router.delete("/:id", starController.delete);

module.exports = router;
