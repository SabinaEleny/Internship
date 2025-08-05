import { productsDb } from '../mock-db/products.db';

export type Product = {
        id: number;
        name: string;
        category: string;
        price: number;
        stock: number;
}

export const products: Product[] = productsDb;