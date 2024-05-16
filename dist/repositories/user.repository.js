"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_model_1 = require("../models/user.model");
const token_model_1 = require("../models/token.model");
const order_enum_1 = require("../enums/order.enum");
const user_list_order_enum_1 = require("../enums/user-list-order.enum");
const api_error_1 = require("../errors/api-error");
class UserRepository {
    async getList(query) {
        const { page = 1, limit = 10, order = order_enum_1.OrderEnum.ASC, orderBy = user_list_order_enum_1.UserListOrderEnum.NAME, search, } = query;
        const filterObj = { isDeleted: false };
        const sortObj = {};
        if (search) {
            filterObj.name = { $regex: search, $options: "i" };
        }
        if (orderBy) {
            switch (orderBy) {
                case user_list_order_enum_1.UserListOrderEnum.NAME:
                    sortObj.name = order;
                    break;
                case user_list_order_enum_1.UserListOrderEnum.AGE:
                    sortObj.age = order;
                    break;
                default:
                    throw new api_error_1.ApiError("Invalid orderBy", 400);
            }
        }
        const skip = (page - 1) * limit;
        return await Promise.all([
            user_model_1.User.find(filterObj).sort(sortObj).limit(limit).skip(skip),
            user_model_1.User.countDocuments(filterObj),
        ]);
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
    async findWithOutActivityAfter(date) {
        return await user_model_1.User.aggregate([
            {
                $lookup: {
                    from: token_model_1.Token.collection.name,
                    let: { userId: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
                        { $match: { createdAt: { $gt: date } } },
                    ],
                    as: "tokens",
                },
            },
            {
                $match: { tokens: { $size: 0 } },
            },
            {
                $project: {
                    _id: 1,
                    email: 1,
                    name: 1,
                },
            },
        ]);
    }
}
exports.userRepository = new UserRepository();
