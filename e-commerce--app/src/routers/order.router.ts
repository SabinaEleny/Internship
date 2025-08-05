import { Router, Request, Response } from 'express';
import { OrderService } from '../services/order.service';

export class OrderRouter {
    private readonly orderService: OrderService;

    constructor(router: Router) {
        this.orderService = new OrderService();
        this.initializeRoutes(router);
    }

    private initializeRoutes(router: Router): void {
        router.get('/orders', this.getAll.bind(this));
        router.get('/orders/:id', this.getById.bind(this));
        router.post('/orders', this.create.bind(this));
        router.delete('/orders/:id', this.delete.bind(this));
    }

    public getAll(_req: Request, res: Response): void {
        try {
            const orders = this.orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public getById(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id, 10);
            const order = this.orderService.getOrderById(id);

            if (!order) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public create(req: Request, res: Response): void {
        try {
            const result = this.orderService.createOrder(req.body);

            if (result && 'error' in result) {
                res.status(400).json({ message: result.error });
                return;
            }
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public delete(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id, 10);
            const deletedOrder = this.orderService.deleteOrder(id);

            if (!deletedOrder) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }
            res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}