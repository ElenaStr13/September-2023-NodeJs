"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    async getList(req, res, next) {
        try {
            const users = await user_service_1.userService.getList();
            res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const userId = req.params.userId;
            const user = await user_service_1.userService.getById(userId);
            res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async updateById(req, res, next) {
        try {
            const userId = req.params.userId;
            const dto = req.body;
            const user = await user_service_1.userService.updateById(userId, dto);
            res.status(201).json(user);
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
