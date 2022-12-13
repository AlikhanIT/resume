const express = require("express");
const fileController = require("../controlles/fileController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const router = express();

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("image"),
  fileController.upload
);

router.delete(
  "/remove/:link",
  authMiddleware,
  adminMiddleware,
  fileController.remove
);

module.exports = router;
