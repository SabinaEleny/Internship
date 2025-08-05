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

    public getAll(_req: Request, res: Response): void {
        try {
            const users = this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public getById(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id, 10);
            const user = this.userService.getUserById(id);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public create(req: Request, res: Response): void {
        try {
            const result = this.userService.createUser(req.body);

            if ('error' in result) {
                res.status(400).json({ message: result.error });
                return;
            }
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public update(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id, 10);
            const updatedUser = this.userService.updateUser(id, req.body);

            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public delete(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id, 10);
            const deletedUser = this.userService.deleteUser(id);

            if (!deletedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}