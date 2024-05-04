"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_model_1 = require("../models/user.model");
class UserRepository {
    async getList() {
        return await user_model_1.User.find({ isDeleted: false });
    }
    async create(dto) {
        return await user_model_1.User.create(dto);
    }
    async getById(userId) {
        return await user_model_1.User.findById(userId);
    }
    async getByParams(params) {
        return await user_model_1.User.findOne(params);
    }
    async updateById(userId, dto) {
        return await user_model_1.User.findByIdAndUpdate(userId, dto, {
            returnDocument: "after",
        });
    }
    async deleteById(userId) {
        await user_model_1.User.deleteOne({ _id: userId });
    }
}
exports.userRepository = new UserRepository();
