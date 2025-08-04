import express from 'express';
import productRoutes from './routes/product.routes';
import { errorHandler } from './errors/error.handler';

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);

app.use(errorHandler);

app.get('/', (_req, res) => {
    res.send('Welcome to the API');
});

export default app;
