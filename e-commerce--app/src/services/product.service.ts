import { Product } from '../entities/products';
import { ProductRepository } from '../repositories/product.repository';

export class ProductService {
    private readonly productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    public getAllProducts(): Product[] {
        return this.productRepository.getAll();
    }

    public getProductById(id: number): Product | undefined {
        return this.productRepository.getById(id);
    }

    public createProduct(productData: Omit<Product, 'id'>): Product {
        return this.productRepository.create(productData);
    }

    public updateProduct(id: number, productData: Partial<Omit<Product, 'id'>>): Product | undefined {
        return this.productRepository.update(id, productData);
    }

    public deleteProduct(id: number): Product | undefined {
        return this.productRepository.delete(id);
    }
}