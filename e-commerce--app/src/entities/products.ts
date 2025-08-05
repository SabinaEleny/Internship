import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
        name: string;
        category: string;
        price: number;
        stock: number;
}

const ProductSchema: Schema = new Schema(
    {
            name: { type: String, required: true, trim: true },
            category: { type: String, required: true, trim: true },
            price: { type: Number, required: true, min: 0 },
            stock: { type: Number, required: true, min: 0, default: 0 },
    },
    {
        versionKey: false
    }
);

export default model<IProduct>('Product', ProductSchema);