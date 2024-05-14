"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_error_1 = require("../errors/api-error");
const user_repository_1 = require("../repositories/user.repository");
const s3_service_1 = require("./s3.service");
const file_item_type_enum_1 = require("../enums/file-item-type.enum");
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
    }
    async uploadAvatar(userId, avatar) {
        const user = await this.findUserOrThrow(userId);
        const filePath = await s3_service_1.s3Service.uploadFile(avatar, file_item_type_enum_1.FileItemTypeEnum.USER, user._id);
        if (user.avatar) {
            await s3_service_1.s3Service.deleteFile(user.avatar);
        }
        return await user_repository_1.userRepository.updateById(userId, { avatar: filePath });
    }
    async deleteAvatar(userId) {
        const user = await this.findUserOrThrow(userId);
        if (user.avatar) {
            await s3_service_1.s3Service.deleteFile(user.avatar);
        }
        return await user_repository_1.userRepository.updateById(userId, { avatar: null });
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
