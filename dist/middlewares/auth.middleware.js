"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const api_error_1 = require("../errors/api-error");
const token_repository_1 = require("../repositories/token.repository");
const token_service_1 = require("../services/token.service");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken) {
                throw new api_error_1.ApiError("No token provided", 401);
            }
            const payload = token_service_1.tokenService.checkToken(accessToken);
            const tokenPair = await token_repository_1.tokenRepository.findByParams({ accessToken });
            if (!tokenPair) {
                throw new api_error_1.ApiError("Invalid token", 401);
            }
            req.res.locals.jwtPayload = payload;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
