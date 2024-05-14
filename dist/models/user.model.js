"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const role_enum_1 = require("../enums/role.enum");
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    password: { type: String, required: true },
    age: { type: Number, required: false },
    role: { type: String, enum: role_enum_1.RoleEnum, default: role_enum_1.RoleEnum.USER },
    avatar: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = mongoose_1.default.model("users", userSchema);
