const express = require("express");
const userRouter = require("./userRouter");
const questionnaireRouter = require("./questionnaireRouter");
const taskRouter = require("./taskRouter");
const commentRouter = require("./commentRouter");
const fileRouter = require("./fileRouter");
const router = express();

router.use("/user", userRouter);
router.use("/questionnaire", questionnaireRouter);
router.use("/task", taskRouter);
router.use("/comment", commentRouter);
router.use("/upload", fileRouter);

module.exports = router;
