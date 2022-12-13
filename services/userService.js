const uuid = require("uuid");
const tokenService = require("../services/tokenService");
const taskService = require("../services/taskService");
const questionnaireService = require("../services/questionnaireService");
const apiError = require("../errors/apiError");
const bcrypt = require("bcrypt");
const userDto = require("../dtos/userDto");
const prisma = require("../prisma/index");

class UserService {
  register = async (email, password, reqIp, phoneNumber, iin, avatar) => {
    const condidat = await prisma.User.findFirst({ where: { email } });
    if (condidat) {
      throw apiError.BadRequest("Такая почта уже существует");
    }

    const passwordHash = await bcrypt.hash(password, 3);

    const result = await prisma.User.create({
      data: {
        email: email,
        password: passwordHash,
        reqIp: reqIp,
        phoneNumber: phoneNumber,
        iin: iin,
        avatar: avatar,
      },
    });

    const user = new userDto(result);

    const { refreshToken, accessToken } = tokenService.generateTokens({
      ...user,
    });

    await tokenService.saveToken(result.id, refreshToken);

    return { ...user, refreshToken: refreshToken, accessToken: accessToken };
  };

  loginByVk = async (id, photo) => {
    try {
      const condidat = await prisma.User.findFirst({
        where: { vkontakte_auth: id },
      });
      if (!condidat) {
        const result = await prisma.User.create({
          data: {
            email: `${uuid.v4()}`,
            password: "none",
            reqIp: "none",
            phoneNumber: "none",
            iin: "none",
            avatar: photo,
            vkontakte_auth: parseInt(id),
          },
        });

        const user = new userDto(result);

        return { ...user };
      }

      const result = await prisma.User.update({
        where: {
          vkontakte_auth: parseInt(id),
        },
        data: {
          datePing: new Date(),
        },
      });

      const user = new userDto(result);

      return { ...user };
    } catch (e) {
      console.log(e);
    }
  };

  loginByGoogle = async (id, photo, email) => {
    try {
      const condidat = await prisma.User.findFirst({
        where: { google_id: id },
      });
      if (!condidat) {
        const result = await prisma.User.create({
          data: {
            email: "email",
            password: "none",
            reqIp: "none",
            phoneNumber: "none",
            iin: "none",
            avatar: photo,
            google_id: parseInt(id),
          },
        });

        const user = new userDto(result);

        return { ...user };
      }

      const result = await prisma.User.update({
        where: {
          google_id: parseInt(id),
        },
        data: {
          datePing: new Date(),
        },
      });

      const user = new userDto(result);

      return { ...user };
    } catch (e) {
      console.log(e);
    }
  };

  login = async (email, password, avatar, reqIp) => {
    const condidat = await prisma.User.findFirst({ where: { email } });
    if (!condidat) {
      throw apiError.BadRequest("Такой почты не существует");
    }
    const passwordHash = await bcrypt.compare(password, condidat.password);

    if (!passwordHash) {
      throw apiError.BadRequest("Пароль не верен");
    }

    await prisma.User.update({
      where: {
        id: condidat.id,
      },
      data: {
        datePing: new Date(),
      },
    });

    const user = new userDto(condidat);

    const { refreshToken, accessToken } = tokenService.generateTokens({
      ...user,
    });

    await tokenService.saveToken(condidat.id, refreshToken);

    return { ...user, refreshToken: refreshToken, accessToken: accessToken };
  };

  logout = async (refreshToken) => {
    console.log(refreshToken);
    const userData = await tokenService.validateRefreshToken(refreshToken);
    await tokenService.removeToken(userData.id);

    return { status: "SUCCES" };
  };

  refresh = async (refreshToken) => {
    if (!refreshToken) {
      throw apiError.UnathorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    console.log(userData, tokenFromDb);
    if (!userData || !tokenFromDb) {
      throw apiError.UnathorizedError();
    }

    const user = await prisma.User.findFirst({ where: { id: userData.id } });
    const result = new userDto(user);

    const tokens = tokenService.generateTokens({ ...result });
    await tokenService.saveToken(result.id, tokens.refreshToken);

    return {
      ...tokens,
      ...result,
    };
  };

  remove = async (id, role) => {
    if (id === role.id || role.role === "admin") {
      await taskService.removeFromUser(id);
      await questionnaireService.removeFromUser(id);
      await tokenService.removeToken(id);

      await prisma.User.deleteMany({
        where: {
          id: id,
        },
      });

      return { message: "SUCCES" };
    } else {
      throw apiError.AccessDenied();
    }
  };

  edit = async (id, email, phoneNumber, iin, avatar, role) => {
    if (id === role.id || role.role === "admin") {
      const user = await prisma.User.update({
        where: {
          id: id,
        },
        data: {
          email,
          phoneNumber,
          iin,
          avatar,
        },
      });

      const result = new userDto(user);

      return result;
    } else {
      throw apiError.AccessDenied();
    }
  };

  get = async (id, role) => {
    if (id === role.id || role === "admin") {
      const user = await prisma.User.findUnique({
        where: {
          id: id,
        },
      });
      const taskIds = await prisma.Task.findMany({
        where: {
          userIds: {
            equals: id,
          },
        },
      });
      const result = new userDto(user);
      return { ...result, taskIds };
    } else {
      throw apiError.AccessDenied();
    }
  };

  getAll = async (role) => {
    if (role.role === "admin") {
      const result = await prisma.User.findMany({
        include: { questionnaireId: true },
      });
      return result;
    } else {
      throw apiError.AccessDenied();
    }
  };
}

module.exports = new UserService();
