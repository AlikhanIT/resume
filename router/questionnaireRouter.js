const express = require("express");
const questionnaireController = require("../controlles/questionnaireController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express();

router.post("/", authMiddleware, questionnaireController.create);
router.put("/:id", authMiddleware, questionnaireController.edit);
router.delete("/:id", authMiddleware, questionnaireController.remove);
router.get("/:id", authMiddleware, questionnaireController.get);
router.get("/", authMiddleware, questionnaireController.getAll);

module.exports = router;
