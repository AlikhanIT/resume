const express = require("express");
const fileController = require("../controlles/fileController");
const authMiddleware = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const router = express();

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("image"),
  fileController.upload
);

module.exports = router;
