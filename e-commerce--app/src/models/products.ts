import { productsDb } from '../constants/products.db';

export class Product {
    constructor(
        public id: number,
        public name: string,
        public category: string,
        public price: number,
        public stock: number
    ) {}
}


export const products: Product[] = productsDb;