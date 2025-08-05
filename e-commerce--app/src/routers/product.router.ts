import { Router, Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductRouter {
    private readonly productService: ProductService;

    constructor(router: Router) {
        this.productService = new ProductService();
        this.initializeRoutes(router);
    }

    private initializeRoutes(router: Router): void {
        router.get('/products', this.getAll.bind(this));
        router.get('/products/:id', this.getById.bind(this));
        router.post('/products', this.create.bind(this));
        router.put('/products/:id', this.update.bind(this));
        router.delete('/products/:id', this.delete.bind(this));
    }

    public async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productService.getAll();
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const product = await this.productService.getById(id);
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const newProduct = await this.productService.create(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedProduct = await this.productService.update(id, req.body);
            if (!updatedProduct) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedProduct = await this.productService.delete(id);
            if (!deletedProduct) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.status(200).json(deletedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}