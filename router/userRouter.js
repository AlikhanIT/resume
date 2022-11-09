const express = require("express");
const userController = require("../controlles/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const authRouter = require("./authRouter");
const router = express();

router.use("/auth", authRouter);

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.delete("/:id", authMiddleware, userController.remove);
router.put("/:id", authMiddleware, userController.edit);
router.get("/getby/:id", authMiddleware, userController.get);
router.get("/getall", authMiddleware, userController.getAll);

module.exports = router;
