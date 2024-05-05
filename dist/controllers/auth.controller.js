"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_presenter_1 = require("../presenters/auth.presenter");
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
}
exports.authController = new AuthController();
