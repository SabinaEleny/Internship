import { usersDb } from '../mock-db/users.db';

export type User = {
         id: number;
         firstName: string;
         lastName: string;
         email: string;
         password: string;
}

export const users: User[] = usersDb;