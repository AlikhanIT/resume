const express = require("express");
const taskController = require("../controlles/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express();

router.post("/", authMiddleware, taskController.create);
router.put("/:id", authMiddleware, taskController.edit);
router.delete("/:id", authMiddleware, taskController.remove);
router.get("/get/:id", authMiddleware, taskController.get);
router.get("/get/", authMiddleware, taskController.getAll);
router.get("/getmy", authMiddleware, taskController.getMyTasks);

module.exports = router;
