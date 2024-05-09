"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_presenter_1 = require("../presenters/auth.presenter");
const user_presenter_1 = require("../presenters/user.presenter");
const status_codes_constant_1 = require("../constants/status-codes.constant");
class AuthController {
    async signUp(req, res, next) {
        try {
            const dto = req.body;
            const data = await auth_service_1.authService.signUp(dto);
            res.status(201).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async signIn(req, res, next) {
        try {
            const dto = req.body;
            const data = await auth_service_1.authService.signIn(dto);
            const response = auth_presenter_1.AuthPresenter.toResponseDto(data);
            res.status(201).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const tokenPair = req.res.locals.tokenPair;
            const data = await auth_service_1.authService.refresh(jwtPayload, tokenPair);
            res.status(201).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async forgotPassword(req, res, next) {
        try {
            const body = req.body;
            await auth_service_1.authService.forgotPassword(body);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async setForgotPassword(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const body = req.body;
            await auth_service_1.authService.setForgotPassword(body, jwtPayload);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async verify(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const user = await auth_service_1.authService.verify(jwtPayload);
            const response = user_presenter_1.UserPresenter.toPrivateResponseDto(user);
            res.status(status_codes_constant_1.statusCodes.CREATED).json(response);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
