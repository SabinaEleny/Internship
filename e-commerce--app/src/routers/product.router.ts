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

    public getAll(_req: Request, res: Response): void {
        try {
            const products = this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public getById(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id, 10);
            const product = this.productService.getProductById(id);
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

    public create(req: Request, res: Response): void {
        try {
            const newProduct = this.productService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public update(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id, 10);
            const updatedProduct = this.productService.updateProduct(id, req.body);
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

    public delete(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id, 10);
            const deletedProduct = this.productService.deleteProduct(id);
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