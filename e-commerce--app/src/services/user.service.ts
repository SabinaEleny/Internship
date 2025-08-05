import { User } from '../entities/users';
import { UserRepository } from '../repositories/user.repository';
import {Product} from "../entities/products";

export class UserService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public getAllUsers(): User[] {
        return this.userRepository.getAll();
    }

    public getUserById(id: number): Omit<User, 'password'> | undefined {
        const user = this.userRepository.getById(id);
        if (!user) {
            return undefined;
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    public createUser(userData: Omit<User, 'id'>): User | { error: string } {
        if (this.userRepository.getByEmail(userData.email)) {
            return { error: 'Email is already in use.' };
        }
        return this.userRepository.create(userData);
    }

    public updateUser(id: number, userData: Partial<Omit<User, 'id'>>): User | undefined {
        return this.userRepository.update(id, userData);
    }

    public deleteUser(id: number): User | undefined {
        return this.userRepository.delete(id);
    }
}