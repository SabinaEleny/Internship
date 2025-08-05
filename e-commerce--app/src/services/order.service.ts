import { Order } from '../entities/orders';
import { User } from '../entities/users';
import { OrderRepository } from '../repositories/order.repository';
import { UserRepository } from '../repositories/user.repository';
import {ProductRepository} from "../repositories/product.repository";
import {Product} from "../entities/products";

type OrderCreationDTO = {
    userId: number;
    products: {
        id: number;
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

    public getAllOrders(): Order[] {
        return this.orderRepository.getAll();
    }

    public getOrderById(id: number): Order | undefined {
        return this.orderRepository.getById(id);
    }

    public createOrder(orderData: OrderCreationDTO): Order | { error: string } {
        const user = this.userRepository.getById(orderData.userId);
        if (!user) {
            return { error: `User with ID ${orderData.userId} not found.` };
        }

        let totalAmount = 0;
        const productsPurchased = [];

        for (const item of orderData.products) {
            const product = this.productRepository.getById(item.id);

            if (!product) {
                return { error: `Product with ID ${item.id} not found.` };
            }

            if (product.stock < item.quantity) {
                return { error: `Not enough stock for product "${product.name}". Available: ${product.stock}, Requested: ${item.quantity}.` };
            }

            totalAmount += product.price * item.quantity;
            productsPurchased.push({ id: item.id, quantity: item.quantity });
        }

        const newOrderData: Omit<Order, 'id'> = {
            user,
            productsPurchased,
            totalAmount
        };
        return this.orderRepository.create(newOrderData);


    }

    public updateOrder(id: number, data: { totalAmount?: number }): Order | undefined {
        return this.orderRepository.update(id, data);
    }

    public deleteOrder(id: number): Order | undefined {
        return this.orderRepository.delete(id);
    }
}