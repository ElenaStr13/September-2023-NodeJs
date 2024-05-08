"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const token_type_enum_1 = require("../enums/token-type.enum");
const api_error_1 = require("../errors/api-error");
const token_repository_1 = require("../repositories/token.repository");
const token_service_1 = require("../services/token.service");
const status_codes_constant_1 = require("../constants/status-codes.constant");
const action_token_type_enum_1 = require("../enums/action-token-type.enum");
const action_token_repository_1 = require("../repositories/action-token.repository");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken) {
                throw new api_error_1.ApiError("No token provided", status_codes_constant_1.statusCodes.UNAUTHORIZED);
            }
            const payload = token_service_1.tokenService.checkToken(accessToken, token_type_enum_1.TokenTypeEnum.ACCESS);
            const tokenPair = await token_repository_1.tokenRepository.findByParams({ accessToken });
            if (!tokenPair) {
                throw new api_error_1.ApiError("Invalid token", status_codes_constant_1.statusCodes.UNAUTHORIZED);
            }
            req.res.locals.jwtPayload = payload;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get("Authorization");
            if (!refreshToken) {
                throw new api_error_1.ApiError("No token provided", status_codes_constant_1.statusCodes.UNAUTHORIZED);
            }
            const payload = token_service_1.tokenService.checkToken(refreshToken, token_type_enum_1.TokenTypeEnum.REFRESH);
            const tokenPair = await token_repository_1.tokenRepository.findByParams({ refreshToken });
            if (!tokenPair) {
                throw new api_error_1.ApiError("Invalid token", status_codes_constant_1.statusCodes.UNAUTHORIZED);
            }
            req.res.locals.jwtPayload = payload;
            req.res.locals.tokenPair = tokenPair;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkActionToken(req, res, next) {
        try {
            const actionToken = req.query.token;
            if (!actionToken) {
                throw new api_error_1.ApiError("No token provided", status_codes_constant_1.statusCodes.BAD_REQUEST);
            }
            const payload = token_service_1.tokenService.checkActionToken(actionToken, action_token_type_enum_1.ActionTokenTypeEnum.FORGOT);
            const entity = await action_token_repository_1.actionTokenRepository.findByParams({
                actionToken,
            });
            if (!entity) {
                throw new api_error_1.ApiError("Invalid token", status_codes_constant_1.statusCodes.UNAUTHORIZED);
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
