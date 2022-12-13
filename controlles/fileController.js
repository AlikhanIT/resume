const fileService = require("../services/fileService");

class FileController {
  upload = async (req, res, next) => {
    try {
      console.log(req.file);
      const url = req.file.filename.split(" ").join("");
      res.json({
        url: `/uploads/${url}`,
      });
    } catch (err) {
      next(err);
    }
  };

  remove = async (req, res, next) => {
    try {
      const { link } = req.params;
      const role = req.user;

      await fileService.remove(link, role);

      res.json({
        status: link,
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new FileController();
