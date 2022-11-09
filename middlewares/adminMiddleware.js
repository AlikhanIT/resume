const ApiError = require("../errors/apiError");
const tokenService = require("../services/tokenService");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnathorizedError());
    }
    const accesssToken = authorizationHeader.split(" ")[1];

    const result = await tokenService.validateAccessToken(accesssToken);
    console.log(result);
    if (result.role === "admin") {
      return next(ApiError.AccessDenied());
    }
    next();
  } catch (err) {
    return next(ApiError.AccessDenied());
  }
};
