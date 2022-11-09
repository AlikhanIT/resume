const userService = require("../services/userService");
const apiError = require("../errors/apiError");

class UserController {
  register = async (req, res, next) => {
    try {
      const reqIp = (
        req.headers["cf-connecting-ip"] ||
        req.headers["x-real-ip"] ||
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        ""
      )
        .split(",")[0]
        .trim();

      const { email, password, phoneNumber, iin, avatar } = req.body;
      const result = await userService.register(
        email,
        password,
        reqIp,
        phoneNumber,
        iin,
        avatar
      );

      res.cookie("refreshToken", result.refreshToken, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  login = async (req, res, next) => {
    try {
      const reqIp = (
        req.headers["cf-connecting-ip"] ||
        req.headers["x-real-ip"] ||
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        ""
      )
        .split(",")[0]
        .trim();

      const { email, password, avatar } = req.body;
      const result = await userService.login(email, password, avatar, reqIp);

      res.cookie("refreshToken", result.refreshToken, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  logout = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      if (!refreshToken) {
        apiError.BadRequest("Вы не вошли в систему");
      }
      const result = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      const result = await userService.refresh(refreshToken.split(" ")[0]);

      res.cookie("refreshToken", result.refreshToken, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = req.user;
      const result = await userService.remove(id, role);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  edit = async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = req.user;
      const { email, password, phoneNumber, iin, avatar } = req.body;
      const result = await userService.edit(
        id,
        email,
        password,
        phoneNumber,
        iin,
        avatar,
        role
      );
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  get = async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = req.user;
      const result = await userService.get(id, role);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const role = req.user;
      const result = await userService.getAll(role);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new UserController();
