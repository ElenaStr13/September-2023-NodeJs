"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPresenter = void 0;
const config_1 = require("../configs/config");
class UserPresenter {
    static toPublicResponseDto(user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            role: user.role,
            avatar: user.avatar ? `${config_1.config.AWS_S3_ENDPOINT}/${user.avatar}` : null,
            isDeleted: user.isDeleted,
            isVerified: user.isVerified,
        };
    }
    static toPublicResponseListDto(users) {
        return users.map(UserPresenter.toPublicResponseDto);
    }
    static toPrivateResponseDto(user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            age: user.age,
            role: user.role,
            avatar: user.avatar ? `${config_1.config.AWS_S3_ENDPOINT}/${user.avatar}` : null,
            isDeleted: user.isDeleted,
            isVerified: user.isVerified,
        };
    }
}
exports.UserPresenter = UserPresenter;
