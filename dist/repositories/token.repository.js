"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRepository = void 0;
const token_model_1 = require("../models/token.model");
const action_token_model_1 = require("../models/action-token.model");
const user_repository_1 = require("./user.repository");
class TokenRepository {
    async create(dto) {
        return await token_model_1.Token.create(dto);
    }
    async findByParams(params) {
        return await token_model_1.Token.findOne(params);
    }
    async findByEmail(params) {
        const user = await token_model_1.Token.findOne(params);
        return user_repository_1.userRepository.getByParams(user);
    }
    async deleteById(id) {
        await token_model_1.Token.deleteOne({ _id: id });
    }
    async deleteByParams(params) {
        await action_token_model_1.ActionToken.deleteMany(params);
    }
}
exports.tokenRepository = new TokenRepository();
