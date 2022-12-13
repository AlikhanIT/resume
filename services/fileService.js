const prisma = require("../prisma/index");
const apiError = require("../errors/apiError");
const fs = require("fs");
const path = require("path");

class TaskService {
  remove = async (link, role) => {
    if (role.role === "admin") {
      const result = await prisma.Image.deleteMany({
        where: {
          id: link,
        },
      });

      fs.unlink(path.join(__dirname, "..", "uploads", link), () => {
        console.log("deleted");
      });
      return result;
    } else {
      throw apiError.AccessDenied();
    }
  };
}

module.exports = new TaskService();
