import { Order, orders } from '../entities/orders';

export class OrderRepository {

    public getAll(): Order[] {
        return [...orders];
    }

    public getById(id: number): Order | undefined {
        return orders.find(o => o.id === id);
    }

    public create(newOrderData: Omit<Order, 'id'>): Order {
        const newOrder: Order = {
            id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
            ...newOrderData,
        };
        orders.push(newOrder);
        return newOrder;
    }

    public update(id: number, orderUpdateData: Partial<Omit<Order, 'id'>>): Order | undefined {
        const index = orders.findIndex(o => o.id === id);
        if (index === -1) {
            return undefined;
        }

        orders[index] = { ...orders[index], ...orderUpdateData };
        return orders[index];
    }

    public delete(id: number): Order | undefined {
        const index = orders.findIndex(o => o.id === id);
        if (index === -1) {
            return undefined;
        }
        return orders.splice(index, 1)[0];
    }
}