"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const api_error_1 = require("../errors/api-error");
const token_repository_1 = require("../repositories/token.repository");
const user_repository_1 = require("../repositories/user.repository");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
const send_grid_service_1 = require("./send-grid.service");
const config_1 = require("../configs/config");
const email_type_enum_1 = require("../enums/email-type.enum");
class AuthService {
    async signUp(dto) {
        await this.isEmailExist(dto.email);
        const hashedPassword = await password_service_1.passwordService.hashPassword(dto.password);
        const user = await user_repository_1.userRepository.create({
            ...dto,
            password: hashedPassword,
        });
        const tokens = token_service_1.tokenService.generatePair({
            userId: user._id,
            role: user.role,
        });
        await token_repository_1.tokenRepository.create({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            _userId: user._id,
        });
        await send_grid_service_1.sendGridService.sendByType(user.email, email_type_enum_1.EmailTypeEnum.WELCOME, {
            name: dto.name,
            frontUrl: config_1.config.FRONT_URL,
            actionToken: "actionToken",
        });
        return { user, tokens };
    }
    async signIn(dto) {
        const user = await user_repository_1.userRepository.getByParams({ email: dto.email });
        if (!user) {
            throw new api_error_1.ApiError("Wrong email or password", 401);
        }
        const isCompare = await password_service_1.passwordService.comparePassword(dto.password, user.password);
        if (!isCompare) {
            throw new api_error_1.ApiError("Wrong email or password", 401);
        }
        const tokens = token_service_1.tokenService.generatePair({
            userId: user._id,
            role: user.role,
        });
        await token_repository_1.tokenRepository.create({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            _userId: user._id,
        });
        return { user, tokens };
    }
    async refresh(jwtPayload, oldPair) {
        const newPair = token_service_1.tokenService.generatePair({
            userId: jwtPayload.userId,
            role: jwtPayload.role,
        });
        await token_repository_1.tokenRepository.deleteById(oldPair._id);
        await token_repository_1.tokenRepository.create({
            ...newPair,
            _userId: jwtPayload.userId,
        });
        return newPair;
    }
    async isEmailExist(email) {
        const user = await user_repository_1.userRepository.getByParams({ email });
        if (user) {
            throw new api_error_1.ApiError("email already exist", 409);
        }
    }
}
exports.authService = new AuthService();
