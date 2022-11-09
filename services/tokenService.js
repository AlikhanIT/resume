const prisma = require("../prisma/index");
const jwt = require("jsonwebtoken");

class tokenService {
  generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, "process.env.JWT_ACCESS_SECRET", {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, "process.env.JWT_REFRESH_SECRET", {
      expiresIn: "14d",
    });

    return {
      accessToken,
      refreshToken,
    };
  };

  validateAccessToken = async (token) => {
    try {
      const userData = jwt.verify(token, "process.env.JWT_ACCESS_SECRET");
      return userData;
    } catch (err) {
      return null;
    }
  };

  validateRefreshToken = (token) => {
    try {
      const userData = jwt.verify(token, "process.env.JWT_REFRESH_SECRET");
      return userData;
    } catch (err) {
      return null;
    }
  };

  saveToken = async (userId, refreshToken) => {
    const tokenData = await prisma.Token.findFirst({
      where: {
        userId: userId,
      },
    });
    if (tokenData) {
      const user = await prisma.Token.update({
        where: {
          userId: userId,
        },
        data: {
          refreshToken: refreshToken,
        },
      });
      return user;
    }

    const token = await prisma.Token.create({
      data: {
        userId: userId,
        refreshToken: refreshToken,
      },
    });

    return token;
  };

  removeToken = async (id) => {
    const tokenData = await prisma.Token.delete({
      where: {
        userId: id,
      },
    });

    if (!tokenData) {
      return null;
    }

    console.log(tokenData);
    return tokenData;
  };

  findToken = async (refreshToken) => {
    const tokenData = await prisma.Token.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
    return tokenData;
  };
}

module.exports = new tokenService();
