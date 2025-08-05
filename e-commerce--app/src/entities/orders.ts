import { ordersDb } from '../mock-db/orders.db';
import {User} from "./users";
import {Product} from "./products";

export type Order = {
    id: number;
    totalAmount: number;
    productsPurchased: {
        id: number;
        quantity: number;
    }[];
    user: User;
};

export const orders: Order[] = ordersDb;