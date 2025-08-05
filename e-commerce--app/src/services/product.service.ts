import { IProduct } from '../entities/products';
import { ProductRepository } from '../repositories/product.repository';

export class ProductService {
    private readonly productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    public async getAll(): Promise<IProduct[]> {
        return this.productRepository.getAll();
    }

    public async getById(id: string): Promise<IProduct | undefined> {
        const product = await this.productRepository.getById(id);
        return product ?? undefined;
    }

    public async create(productData: Omit<IProduct, 'id'>): Promise<IProduct> {
        return this.productRepository.create(productData);
    }

    public async update(id: string, productData: Partial<IProduct>): Promise<IProduct | undefined> {
        const product = await this.productRepository.update(id, productData);
        return product ?? undefined;
    }

    public async delete(id: string): Promise<IProduct | undefined> {
        const product = await this.productRepository.delete(id);
        return product ?? undefined;
    }
}