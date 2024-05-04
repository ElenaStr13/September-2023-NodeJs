"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_error_1 = require("../errors/api-error");
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    async getList() {
        return await user_repository_1.userRepository.getList();
    }
    async getById(userId) {
        return await this.findUserOrThrow(userId);
    }
    async getMe(userId) {
        return await this.findUserOrThrow(userId);
    }
    async deleteById(userId) {
        await this.findUserOrThrow(userId);
        return await user_repository_1.userRepository.deleteById(userId);
    }
    async updateMe(userId, dto) {
        await this.findUserOrThrow(userId);
        return await user_repository_1.userRepository.updateById(userId, dto);
    }
    async deleteMe(userId) {
        await this.findUserOrThrow(userId);
        await user_repository_1.userRepository.updateById(userId, { isDeleted: true });
        await user_repository_1.userRepository.deleteById(userId);
    }
    async findUserOrThrow(userId) {
        const user = await user_repository_1.userRepository.getById(userId);
        if (!user) {
            throw new api_error_1.ApiError("user not found", 404);
        }
        return user;
    }
}
exports.userService = new UserService();
