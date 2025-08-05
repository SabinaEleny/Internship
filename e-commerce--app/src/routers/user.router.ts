import { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserRouter {
    private readonly userService: UserService;

    constructor(router: Router) {
        this.userService = new UserService();
        this.initializeRoutes(router);
    }

    private initializeRoutes(router: Router): void {
        router.get('/users', this.getAll.bind(this));
        router.get('/users/:id', this.getById.bind(this));
        router.post('/users', this.create.bind(this));
        router.put('/users/:id', this.update.bind(this));
        router.delete('/users/:id', this.delete.bind(this));
    }

    public async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAll();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await this.userService.getById(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.userService.create(req.body);
            if ('error' in result) {
                res.status(400).json({ message: result.error });
                return;
            }
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedUser = await this.userService.update(id, req.body);
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedUser = await this.userService.delete(id);
            if (!deletedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}