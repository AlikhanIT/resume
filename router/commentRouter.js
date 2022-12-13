const express = require("express");
const taskController = require("../controlles/taskController");
const commentController = require("../controlles/commentController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express();

router.post("/:id", authMiddleware, commentController.create);
router.put("/:id", authMiddleware, taskController.edit);
router.delete("/:id", authMiddleware, taskController.remove);
router.get("/get/:id", authMiddleware, taskController.get);
router.get("/get/", authMiddleware, commentController.getAll);
router.get("/get/:id", authMiddleware, commentController.getMyTasksComments);

module.exports = router;
