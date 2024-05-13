"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionTokenRepository = void 0;
const action_token_model_1 = require("../models/action-token.model");
class ActionTokenRepository {
    async create(dto) {
        return await action_token_model_1.ActionToken.create(dto);
    }
    async findByParams(params) {
        return await action_token_model_1.ActionToken.findOne(params);
    }
    async deleteByParams(params) {
        await action_token_model_1.ActionToken.deleteMany(params);
    }
}
exports.actionTokenRepository = new ActionTokenRepository();
