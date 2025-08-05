import { User, users } from '../entities/users';

export class UserRepository {
    public getAll(): User[] {
        return [...users];
    }

    public getById(id: number): User | undefined {
        return users.find(u => u.id === id);
    }

    public getByEmail(email: string): User | undefined {
        return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    public create(newUserData: Omit<User, 'id'>): User {
        const newUser: User = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            ...newUserData,
        };
        users.push(newUser);
        return newUser;
    }

    public update(id: number, userUpdateData: Partial<Omit<User, 'id'>>): User | undefined {
        const index = users.findIndex(u => u.id === id);
        if (index === -1) {
            return undefined;
        }

        users[index] = { ...users[index], ...userUpdateData };
        return users[index];
    }

    public delete(id: number): User | undefined {
        const index = users.findIndex(u => u.id === id);
        if (index === -1) {
            return undefined;
        }
        return users.splice(index, 1)[0];
    }
}