const ApiError = require("../errors/apiError");
const tokenService = require("../services/tokenService");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);

    if (!authorizationHeader) {
      return next(ApiError.UnathorizedError());
    }

    const accesssToken = authorizationHeader.split(" ")[1];
    console.log("accesssToken", accesssToken);
    if (!accesssToken) {
      return next(ApiError.UnathorizedError());
    }
    const userData = await tokenService.validateAccessToken(accesssToken);
    console.log("userData", userData);
    if (!userData) {
      return next(ApiError.UnathorizedError());
    }

    req.user = userData;
    next();
  } catch (err) {
    return ApiError.UnathorizedError();
  }
};
