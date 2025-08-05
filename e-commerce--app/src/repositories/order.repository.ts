import OrderModel, { IOrder } from '../entities/orders';

export class OrderRepository {
    public async getAll(): Promise<IOrder[]> {
        return OrderModel.find({});
    }

    public async getById(id: string): Promise<IOrder | null> {
        return OrderModel.findById(id);
    }

    public async create(orderData: Omit<IOrder, 'id'>): Promise<IOrder> {
        const newOrder = await OrderModel.create(orderData);
        return newOrder.populate(['user', 'productsPurchased.product']);
    }

    public async delete(id: string): Promise<IOrder | null> {
        return OrderModel.findByIdAndDelete(id);
    }
}