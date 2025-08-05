import { IUser } from '../entities/users';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async getAll(): Promise<Partial<IUser>[]> {
        return this.userRepository.getAll();
    }

    public async getById(id: string): Promise<IUser | undefined> {
        const user = await this.userRepository.getById(id);
        return user ?? undefined;
    }

    public async create(userData: Omit<IUser, 'id'>): Promise<Partial<IUser> | { error: string }> {
        const existingUser = await this.userRepository.getByEmail(userData.email);
        if (existingUser) {
            return { error: 'Email is already in use.' };
        }

        const newUser = await this.userRepository.create(userData);
        const { password, ...userWithoutPassword } = newUser.toObject();
        return userWithoutPassword;
    }

    public async update(id: string, userData: Partial<IUser>): Promise<IUser | undefined> {
        const user = await this.userRepository.update(id, userData);
        return user ?? undefined;
    }

    public async delete(id: string): Promise<IUser | undefined> {
        const user = await this.userRepository.delete(id);
        return user ?? undefined;
    }
}