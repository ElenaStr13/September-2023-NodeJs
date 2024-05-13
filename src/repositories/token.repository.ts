import { FilterQuery } from "mongoose";

import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";
import {ActionToken} from "../models/action-token.model";
import {userRepository} from "./user.repository";
import {IUser} from "../interfaces/user.interface";

class TokenRepository {
    public async create(dto: IToken): Promise<IToken> {
        return await Token.create(dto);
    }

    public async findByParams(params: FilterQuery<IToken>): Promise<IToken> {
        return await Token.findOne(params);
    }

    public async findByEmail(params: FilterQuery<IToken>): Promise<IUser> {
        const user = await Token.findOne(params);
        return userRepository.getByParams(user)
    }

    public async deleteById(id: string): Promise<void> {
        await Token.deleteOne({ _id: id });
    }

    public async deleteByParams(params: FilterQuery<IToken>): Promise<void> {
        await ActionToken.deleteMany(params);
    }
}

export const tokenRepository = new TokenRepository();