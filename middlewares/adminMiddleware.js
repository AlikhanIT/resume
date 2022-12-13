const ApiError = require("../errors/apiError");
const tokenService = require("../services/tokenService");

module.exports = async (req, res, next) => {
  try {
    const result = req.user;
    if (result.role !== "admin") {
      return next(ApiError.AccessDenied());
    }
    next();
  } catch (err) {
    return next(ApiError.AccessDenied());
  }
};
