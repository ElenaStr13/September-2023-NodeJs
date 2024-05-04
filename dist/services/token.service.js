"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken = __importStar(require("jsonwebtoken"));
const config_1 = require("../configs/config");
const api_error_1 = require("../errors/api-error");
class TokenService {
    generatePair(payload) {
        const accessToken = jsonwebtoken.sign(payload, config_1.config.JWT_ACCESS_SECRET, {
            expiresIn: config_1.config.JWT_ACCESS_EXPIRES_IN,
        });
        const refreshToken = jsonwebtoken.sign(payload, config_1.config.JWT_REFRESH_SECRET, {
            expiresIn: config_1.config.JWT_REFRESH_EXPIRES_IN,
        });
        return {
            accessToken,
            accessExpiresIn: config_1.config.JWT_ACCESS_EXPIRES_IN,
            refreshToken,
            refreshExpiresIn: config_1.config.JWT_REFRESH_EXPIRES_IN,
        };
    }
    checkToken(token) {
        try {
            return jsonwebtoken.verify(token, config_1.config.JWT_ACCESS_SECRET);
        }
        catch (error) {
            throw new api_error_1.ApiError("Token is not valid", 401);
        }
    }
}
exports.tokenService = new TokenService();
