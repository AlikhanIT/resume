class FileController {
  upload = async (req, res, next) => {
    try {
      const url = req.file.filename.split(" ").join("");
      res.json({
        url: `/uploads/${url}`,
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new FileController();
