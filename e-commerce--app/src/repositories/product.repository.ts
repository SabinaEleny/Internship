import { Product, products } from '../entities/products';

export class ProductRepository {
    public getAll(): Product[] {
        return products;
    }

    public getById(id: number): Product | undefined {
        return products.find(p => p.id === id);
    }

    public create(newProductData: Omit<Product, 'id'>): Product {
        const newProduct: Product = {
            id: products.length + 1,
            ...newProductData,
        };
        products.push(newProduct);
        return newProduct;
    }

    public update(id: number, productUpdateData: Partial<Omit<Product, 'id'>>): Product | undefined {
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
            return undefined;
        }

        products[index] = { ...products[index], ...productUpdateData };
        return products[index];
    }

    public delete(id: number): Product | undefined {
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
            return undefined;
        }
        return products.splice(index, 1)[0];
    }
}