
import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getList(): Promise<IUser[]> {
        return await userRepository.getList();
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        await this.isEmailExist(dto.email);
        return await userRepository.create(dto);
    }

    public async getById(userId: string): Promise<IUser> {
        return await this.findUserOrThrow(userId);
    }

    public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
        await this.findUserOrThrow(userId);
        return await userRepository.updateById(userId, dto);
    }

    public async deleteById(userId: string): Promise<void> {
        await this.findUserOrThrow(userId);
        return await userRepository.deleteById(userId);
    }

    private async isEmailExist(email: string): Promise<void> {
        const user = await userRepository.getByParams({ email });
        if (user) {
            throw new ApiError("email already exist", 409);
        }
    }

    private async findUserOrThrow(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("user not found", 404);
        }
        return user;
    }
}

export const userService = new UserService();
