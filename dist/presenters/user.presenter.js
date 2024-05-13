"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPresenter = void 0;
class UserPresenter {
    static toPublicResponseDto(user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            role: user.role,
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
            isDeleted: user.isDeleted,
            isVerified: user.isVerified,
        };
    }
}
exports.UserPresenter = UserPresenter;
