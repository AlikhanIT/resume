const prisma = require("../prisma/schema.prisma");
const apiError = require("../errors/apiError");

class UserService {
  create = async (text, liked, user) => {
    const result = "test";
    console.log("service ended");
    return result;
  };

  remove = async (id) => {
    const result = "test";
    console.log("service ended");
    return result;
  };
}

module.exports = new UserService();
