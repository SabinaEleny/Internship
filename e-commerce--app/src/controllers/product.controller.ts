import { Request, Response } from 'express';
import { Product, products } from '../models/products';

export class ProductController {
    getAll(req: Request, res: Response): void {
        try {
            res.json(products);
        } catch (error) {
            console.error(error);
        }
    }

    getById(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id, 10);
            const product = products.find(p => p.id === id);
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.json(product);
        } catch (error) {
            console.error(error);
        }
    }

    create(req: Request, res: Response): void {
        try {
            const newProduct: Product = {
                id: products.length + 1,
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                stock: req.body.stock,
            };
            products.push(newProduct);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error(error);
        }
    }

    update(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id, 10);
            const index = products.findIndex(p => p.id === id);

            if (index === -1) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }

            const { name, category, price, stock } = req.body;

            products[index] = {
                ...products[index],
                ...(name !== undefined && { name }),
                ...(category !== undefined && { category }),
                ...(price !== undefined && { price }),
                ...(stock !== undefined && { stock }),
            };

            res.json(products[index]);
        } catch (error) {
            console.error(error);
        }
    }


    delete(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id, 10);
            const index = products.findIndex(p => p.id === id);
            if (index === -1) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            const deleted = products.splice(index, 1)[0];
            res.json(deleted);
        } catch (error) {
            console.error(error);
        }
    }
}
