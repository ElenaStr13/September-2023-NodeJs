"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const user_presenter_1 = require("../presenters/user.presenter");
class UserController {
    async getList(req, res, next) {
        try {
            const users = await user_service_1.userService.getList();
            const response = user_presenter_1.UserPresenter.toPublicResponseListDto(users);
            res.json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const userId = req.params.userId;
            const user = await user_service_1.userService.getById(userId);
            const response = user_presenter_1.UserPresenter.toPublicResponseDto(user);
            res.json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async getMe(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const user = await user_service_1.userService.getMe(jwtPayload.userId);
            const response = user_presenter_1.UserPresenter.toPrivateResponseDto(user);
            res.json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async updateMe(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const dto = req.body;
            const user = await user_service_1.userService.updateMe(jwtPayload.userId, dto);
            const response = user_presenter_1.UserPresenter.toPrivateResponseDto(user);
            res.status(201).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteMe(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            await user_service_1.userService.deleteMe(jwtPayload.userId);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            const userId = req.params.userId;
            await user_service_1.userService.deleteById(userId);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
