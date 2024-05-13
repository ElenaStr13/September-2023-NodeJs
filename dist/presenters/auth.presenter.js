"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPresenter = void 0;
const user_presenter_1 = require("./user.presenter");
class AuthPresenter {
    static toResponseDto(data) {
        return {
            user: user_presenter_1.UserPresenter.toPrivateResponseDto(data.user),
            tokens: data.tokens,
        };
    }
}
exports.AuthPresenter = AuthPresenter;
