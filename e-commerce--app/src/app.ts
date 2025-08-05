import express, { Application, Router } from 'express';
import config from './config/config';
import { errorHandler } from './middlewares/error.handler';
import { ProductRouter } from './routers/product.router';
import { UserRouter } from './routers/user.router';
import { OrderRouter } from './routers/order.router';

export class App {
    private readonly app: Application;
    private readonly port: number;

    constructor() {
        this.app = express();
        this.port = config.port;
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
            console.log(`Environment: ${config.nodeEnv}`);
        });
    }

    private initializeMiddleware(): void {
        this.app.use(express.json());
    }

    private initializeRoutes(): void {
        const apiRouter = Router();

        new ProductRouter(apiRouter);
        new UserRouter(apiRouter);
        new OrderRouter(apiRouter);

        this.app.get('/', (_req, res) => {
            res.send('Welcome to the API');
        });

        this.app.use('/api/', apiRouter);
    }

    private initializeErrorHandling(): void {
        this.app.use(errorHandler);
    }
}