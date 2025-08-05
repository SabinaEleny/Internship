import ProductModel, { IProduct } from '../entities/products';
import { UpdateQuery } from 'mongoose';

export class ProductRepository {
    public async getAll(): Promise<IProduct[]> {
        return ProductModel.find({});
    }

    public async getById(id: string): Promise<IProduct | null> {
        return ProductModel.findById(id);
    }

    public async create(productData: Omit<IProduct, 'id'>): Promise<IProduct> {
        return ProductModel.create(productData);
    }

    public async update(id: string, productData: UpdateQuery<IProduct>): Promise<IProduct | null> {
        return ProductModel.findByIdAndUpdate(id, productData, { new: true });
    }

    public async delete(id: string): Promise<IProduct | null> {
        return ProductModel.findByIdAndDelete(id);
    }
}