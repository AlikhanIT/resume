const multer = require("multer");
const fs = require("fs");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    fs.mkdirSync("uploads", { recursive: true });
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    const name = uuid.v4() + String(file.originalname).split(" ").join("");
    cb(null, name);
  },
});

const types = [
  "image/png",
  "image/jpeg",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/heic",
  "image/gif",
  "image/doc",
  "image/docx",
  "image/txt",
  "image/xlsx",
  "image.png",
  "image.jpeg",
  "image.jpg",
  "image.heic",
  "image.gif",
  "image.doc",
  "image.docx",
  "image.txt",
  "image.xlsx",
];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
