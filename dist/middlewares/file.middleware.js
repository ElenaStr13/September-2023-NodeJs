"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMiddleware = void 0;
const file_constant_1 = require("../constants/file.constant");
const status_codes_constant_1 = require("../constants/status-codes.constant");
const api_error_1 = require("../errors/api-error");
class FileMiddleware {
    isAvatarValid(req, res, next) {
        try {
            const avatar = req.files?.avatar;
            if (!avatar) {
                throw new api_error_1.ApiError("Empty file", status_codes_constant_1.statusCodes.BAD_REQUEST);
            }
            if (Array.isArray(avatar)) {
                throw new api_error_1.ApiError("Must be not array", status_codes_constant_1.statusCodes.BAD_REQUEST);
            }
            if (!file_constant_1.avatarConfig.MIMETYPE.includes(avatar.mimetype)) {
                throw new api_error_1.ApiError("Invalid file format", status_codes_constant_1.statusCodes.BAD_REQUEST);
            }
            if (avatar.size > file_constant_1.avatarConfig.MAX_SIZE) {
                throw new api_error_1.ApiError("File is too large", status_codes_constant_1.statusCodes.BAD_REQUEST);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.fileMiddleware = new FileMiddleware();
