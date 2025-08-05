import { IOrder } from '../entities/orders';
import { OrderRepository } from '../repositories/order.repository';
import { UserRepository } from '../repositories/user.repository';
import { ProductRepository } from '../repositories/product.repository';

type OrderCreationDTO = {
    userId: string;
    products: {
        id: string;
        quantity: number;
    }[];
};

export class OrderService {
    private readonly orderRepository: OrderRepository;
    private readonly userRepository: UserRepository;
    private readonly productRepository: ProductRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
        this.userRepository = new UserRepository();
        this.productRepository = new ProductRepository();
    }

    public async getAll(): Promise<IOrder[]> {
        return this.orderRepository.getAll();
    }

    public async getById(id: string): Promise<IOrder | undefined> {
        const order = await this.orderRepository.getById(id);
        return order ?? undefined;
    }

    public async create(orderData: OrderCreationDTO): Promise<IOrder | { error: string }> {
        const user = await this.userRepository.getById(orderData.userId);
        if (!user) {
            return { error: `User with ID ${orderData.userId} not found.` };
        }

        let totalAmount = 0;
        const productsPurchased = [];

        for (const item of orderData.products) {
            const product = await this.productRepository.getById(item.id);

            if (!product) {
                return { error: `Product with ID ${item.id} not found.` };
            }
            if (product.stock < item.quantity) {
                return { error: `Not enough stock for "${product.name}".` };
            }

            totalAmount += product.price * item.quantity;
            productsPurchased.push({ product: product._id, quantity: item.quantity });
        }

        for (const item of orderData.products) {
            await this.productRepository.update(item.id, { $inc: { stock: -item.quantity } });
        }

        const newOrderData = {
            user: user._id,
            productsPurchased,
            totalAmount,
        };

        return this.orderRepository.create(newOrderData as any);
    }

    public async delete(id: string): Promise<IOrder | undefined> {
        const order = await this.orderRepository.delete(id);
        return order ?? undefined;
    }
}