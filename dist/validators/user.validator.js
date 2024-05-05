"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const regex_constants_1 = require("../constants/regex.constants");
class UserValidator {
    static userName = joi_1.default.string().min(3).max(50).trim().messages({
        "string.empty": "{{#label}} not be empty",
        "string.max": "{{#label}} length must be less than or equal to {{#limit}} characters long2",
        "string.min": "{{#label}} length must be at least {{#limit}} characters long2",
    });
    static phone = joi_1.default.string().regex(regex_constants_1.regexConstant.PHONE).trim();
    static age = joi_1.default.number().min(18).max(100);
    static email = joi_1.default
        .string()
        .regex(regex_constants_1.regexConstant.EMAIL)
        .lowercase()
        .trim();
    static password = joi_1.default.string().regex(regex_constants_1.regexConstant.PASSWORD).trim();
    static create = joi_1.default.object({
        name: this.userName.required(),
        email: this.email.required(),
        password: this.password.required(),
        phone: this.phone,
        age: this.age,
    });
    static update = joi_1.default.object({
        name: this.userName,
        phone: this.phone,
        age: this.age,
    });
    static login = joi_1.default.object({
        email: this.email.required(),
        password: this.password.required(),
    });
}
exports.UserValidator = UserValidator;
