"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddleware = void 0;
const mongoose_1 = require("mongoose");
const api_error_1 = require("../errors/api-error");
class CommonMiddleware {
    isIdValid(req, res, next) {
        try {
            const id = req.params.userId;
            if (!(0, mongoose_1.isObjectIdOrHexString)(id)) {
                throw new api_error_1.ApiError("Invalid id", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    isBodyValid(validator) {
        return async (req, res, next) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.commonMiddleware = new CommonMiddleware();
