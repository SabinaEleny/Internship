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

    public async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const orders = await this.orderService.getAll();
            res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const order = await this.orderService.getById(id);
            if (!order) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }
            res.status(200).json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.orderService.create(req.body);
            if (result && 'error' in result) {
                res.status(400).json({ message: result.error });
                return;
            }
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedOrder = await this.orderService.delete(id);
            if (!deletedOrder) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }
            res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}