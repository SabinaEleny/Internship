import UserModel, { IUser } from '../entities/users';

export class UserRepository {
    public async getAll(): Promise<IUser[]> {
        return UserModel.find({}).select('-password'); // Exclude câmpul password
    }

    public async getById(id: string): Promise<IUser | null> {
        return UserModel.findById(id).select('-password');
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({ email: email.toLowerCase() });
    }

    public async create(userData: Omit<IUser, 'id'>): Promise<IUser> {
        return UserModel.create(userData);
    }

    public async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(id, userData, { new: true }).select('-password');
    }

    public async delete(id: string): Promise<IUser | null> {
        return UserModel.findByIdAndDelete(id).select('-password');
    }
}